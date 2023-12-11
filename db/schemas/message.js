import { Schema, model } from "mongoose";

const messageSchema = Schema({
    _id: Schema.Types.ObjectId,
    text: String,
    from: String
},  { 
    collection: 'messages'
})

export default model("Message", messageSchema);