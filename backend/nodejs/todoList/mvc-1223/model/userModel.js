import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "請提供使用者名稱"],
    },
    age: {
      type: Number,
      required: [true, "請提供使用者年齡"],
    },
    email: {
      type: String,
      required: [true, "請提供使用者信箱"],
    },
    address: {
      type: String,
      required: [true, "請提供使用者地址"],
    },
    password: {
      type: String,
      required: [true, "請提供使用者密碼"],
    },
  },
  {
    collection: "user",
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userModel);

export default User;
