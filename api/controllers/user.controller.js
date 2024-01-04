import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = async (req, res, next) => {
    res.json({ message: "test" })
}


export const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
        return res.status(401).json("Email already in use");
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const { password: pass, ...newUserWithoutPassword } = newUser._doc;
    try {
        await newUser.save();
        res.status(201).json(newUserWithoutPassword);
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(401, "wrong credentials"));
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "wrong credentials"));
        const { password: pass, ...UserWithoutPassword } = validUser._doc;
        res.status(200).json(UserWithoutPassword);
    } catch (error) {
        next(error);
    }
}