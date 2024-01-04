import express from "express"
import { login, register, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", test)
router.post("/register", register);
router.post("/login", login);

export default router;