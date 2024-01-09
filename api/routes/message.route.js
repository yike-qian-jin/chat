import express from "express"
import { addMessage, getAllMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/add-message", addMessage);
router.post("/get-all-messages", getAllMessages);

export default router;