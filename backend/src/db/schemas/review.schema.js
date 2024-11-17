import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    id: Number,
    name: String,
    rating: String,
    comment: String
})


export default reviewSchema;
