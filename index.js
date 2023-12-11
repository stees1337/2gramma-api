import express from "express";
import bodyParser from "body-parser";
import { connect } from "./db/db.js";
import messagesRouter from "./routes/messagesRouter.js"
import fileUpload from 'express-fileupload';
import cors from 'cors'
import { faker } from '@faker-js/faker';
import cookieParser from "cookie-parser";
import http from 'http'
import { Server } from 'socket.io'; 
import User from "./db/schemas/user.js";
import mongoose from "mongoose";
import Message from "./db/schemas/message.js";

(async () => {
    await User.deleteMany();
})();

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket) => { 
    const user = await User.create({
        _id: new mongoose.Types.ObjectId(),
        name: faker.internet.userName(),
        socket_id: socket.id
    })

    socket.emit("user", 
        user
    )

    socket.on("message", async (message) => {
        const { from, text } = message

        io.sockets.emit('message', {
            text: text,
            from: from
        })

        await Message.create({
            _id: new mongoose.Types.ObjectId(),
            from: from,
            text: text
        })
    })

    socket.on('disconnect', async () => {
        await User.deleteOne({
            _id: user._id
        })
    });

});

server.listen(3000);

const PORT = 1337

connect()
/* */
app.use(cors({
    origin: "*"
    , credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())

app.use('/api/messages', messagesRouter)

app.listen(PORT, () => console.log(`api started on *:${PORT}`))

//fiverr