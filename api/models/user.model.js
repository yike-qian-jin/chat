import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: "",
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;