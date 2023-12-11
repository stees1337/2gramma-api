import Message from "../db/schemas/message.js";

async function getMessages (req, res) {
    const messages = await Message.find()
    res.status(200).json(messages)
}

export default {
    getMessages
}
