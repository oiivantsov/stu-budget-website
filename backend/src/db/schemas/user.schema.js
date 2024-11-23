"use strict";

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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
    favorites: [mongoose.Schema.Types.ObjectId]
});


export default userSchema;
