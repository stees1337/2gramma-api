import { Router } from "express";
import messagesController from "../controllers/messagesController.js"

const messagesRouter = Router()

messagesRouter.get("/", messagesController.getMessages)

export default messagesRouter; 