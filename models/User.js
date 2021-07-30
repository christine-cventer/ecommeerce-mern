import mongoose from 'mongoose';
//hashes passwords
import crypto from 'crypto';
//generates unique strings
import uuidv1 from 'uuid/v1';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        // stores purchases per user
        history: {
            type: Array,
            defauly: [],
        },
    },
    { timestamps: true }
);
