import Message from "../models/message.model.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })
        if (data) {
            return res.status(201).json(data);
        } else {

        } return res.status(401).json({ msg: "failed to add message" });
    } catch (error) {
        next(error);
    }
}

export const getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        return res.status(201).json(projectedMessages);
    } catch (error) {
        next(error);
    }
}