import mongoose from "mongoose";

export default class MongooseConnection {
    constructor() {
        if (MongooseConnection.instance) return MongooseConnection.instance;

        try {
            mongoose.connect(process.env.DB_ADDRESS)
                .then(() => console.log("Connected"))
                .catch(() => console.log("Failed connecting"));
            this.connection = mongoose.connection;
        } catch (e) {
            console.log(e.message);
        }

        MongooseConnection.instance = this;
    }
}
