
import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: {
        type:String,
        required:true
    }
})


export default imageSchema;
