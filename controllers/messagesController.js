import crypto from "crypto"
import config from "../data/config.js";
import Message from "../db/schemas/message.js";

const md5 = data => crypto.createHash('md5')
    .update(data)
    .digest("hex")

async function getMessages (req, res) {
    const messages = await Message.find()
    res.status(200).json(messages)
}

export default {
    getMessages
}
