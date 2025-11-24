import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "user",
  },
);

export const User = mongoose.model("user", userSchema);
