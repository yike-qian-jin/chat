import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const test = async (req, res, next) => {
    res.json({ message: "test" })
}


export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ email });
    if (usernameCheck) {
        return res.status(401).json("Email already in use");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const { password: pass, ...newUserWithoutPassword } = newUser._doc;
    try {
        await newUser.save();
        res.status(201).json({ status: true, newUserWithoutPassword });
    } catch (error) {
        next(error);
    }
}