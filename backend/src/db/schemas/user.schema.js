"use strict";

import mongoose from "mongoose";
import reviewSchema from "./review.schema.js";
import restaurantSchema from "./restaurant.schema.js";


const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    favorites: [restaurantSchema]
});


export default userSchema;
