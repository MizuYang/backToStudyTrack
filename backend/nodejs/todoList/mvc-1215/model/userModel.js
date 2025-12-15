import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "請填寫使用者名稱"],
    },
    age: {
      type: Number,
      min: [0, "年齡不可小於 0"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "user",
  },
);

export const User = mongoose.model("User", userSchema);
