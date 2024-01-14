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