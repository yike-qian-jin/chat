import express from "express"
import { register, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", test)
router.post("/register", register);

export default router;