import express from "express"
import { getUserById, login, register, setAvatar, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getUserById);
router.get("/allUsers", getAllUsers);

export default router;