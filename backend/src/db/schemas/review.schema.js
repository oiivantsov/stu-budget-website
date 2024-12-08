import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (for population)
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant', // Reference to the Restaurant model (for population)
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: String
})


export default reviewSchema;
