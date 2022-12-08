import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    index: { unique: true },
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = model("user", userSchema);
