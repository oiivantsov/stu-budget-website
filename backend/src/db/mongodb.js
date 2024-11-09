import mongoose from "mongoose";
import { DB_ADDRESS } from "../configs/dao.config.js";

export class MongooseConnection {
    constructor() {
        if (MongooseConnection.instance) return MongooseConnection.instance;

        try {
            mongoose.connect(DB_ADDRESS)
            .then(e => console.log("Connected"))
            .catch(e => console.log("Failed connecting"));
            this.connection = mongoose.connection;
        } catch (e) {
            console.log(e.message);
        }

        MongooseConnection.instance = this;
    }
}