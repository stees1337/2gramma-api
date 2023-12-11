import mongoose from "mongoose";
import config from "../data/config.js";
import User from "./schemas/user.js";

export function connect() {
    mongoose.connect(config.mongo_url)
        .then(() => {
            console.log("mongo connected")
        })
        .catch((e) => {
            console.log(e);
        })
}






