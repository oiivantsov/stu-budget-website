
import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: String
})


export default imageSchema;
