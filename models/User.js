import mongoose from "mongoose";

//hashes passwords
import crypto from "crypto";
//generates unique strings
import { v4 as uuidv4 } from "uuid";
uuidv4();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
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
UserSchema.virtual("password")
  //setters set/assign properties
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  //allows access to properties
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainTextPassword) {
    //compare password entered to hashed password in database
    return this.encryptPassword(plainTextPassword) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    // if a password IS present, proceed
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "Password error: ", error;
    }
  },
};

export default mongoose.model("User", UserSchema);
