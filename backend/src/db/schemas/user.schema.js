"use strict";

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


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
        required: true,
        unique: true
    },
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Restaurant",
        autoCreate: true,
    },
    // New address field
    address: {
        street: {
            type: String,
            default: null
        },
        city: {
            type: String,
            default: null
        }
    }
});

userSchema.statics.signup = async function (user) {
    const { username, password, email } = user;

    if (!username || !password || !email) {
        throw Error("All fields are required");
    }

    if (await this.findOne({ email: email })) {
        throw Error("Email already in use");
    }

    if (!validator.isEmail(email)) {
        throw Error("Invalid email");
    }

    // Disabled for testing
    /*
        if (!validator.isStrongPassword(password)) {
            throw Error("Password must have at least: " +
                "8 characters, 1 lower case character, 1 upper case character, 1 number, 1 symbol"
            );
        }
    */

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.create({
        username,
        password: hashedPassword,
        email,
        address: user.address // Optional field
    })

    if (!newUser) {
        throw Error("Internal server error");
    }

    return { _id: newUser.id, username: newUser.username, email: newUser.email };
}


export default userSchema;