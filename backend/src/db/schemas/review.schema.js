import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: String
})


export default reviewSchema;
