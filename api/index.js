import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import { Server } from "socket.io";
import path from "path";

dotenv.config();
const app = express();
const userStatus = {};


app.use(express.json());
app.use(cors());


const server = app.listen(process.env.PORT, async () => {
    await connectDB();
    console.log(`listening on port ${process.env.PORT}`)
})

const __dirname = path.resolve();

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


global.onlineUsers = new Map();
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    userStatus[userId] = "online"
    socket.emit('userStatus', userStatus);


    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-message", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("message-received", data.message);
        }
    })

    socket.on('disconnect', () => {
        userStatus[userId] = 'offline';
        io.emit('userStatus', userStatus);
    });
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})