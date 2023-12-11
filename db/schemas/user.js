import { Schema, model } from "mongoose";

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    socket_id: String
},  { 
    collection: 'users'
})

export default model("User", userSchema);