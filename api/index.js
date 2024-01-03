import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT, async () => {
    await connectDB();
    console.log(`listening on port ${process.env.PORT}`)
})

app.use("/api/auth", userRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})