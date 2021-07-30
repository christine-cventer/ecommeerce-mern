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

//virtual field
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return '';
        // if a password IS present, proceed
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return 'Error with crypto hashing: ', error;
        }
    },
};

export default mongoosee.model('User', UserSchema);
