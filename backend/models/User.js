const mongoose = require("mongoose");

//使用者
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Number,
      default: false,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
