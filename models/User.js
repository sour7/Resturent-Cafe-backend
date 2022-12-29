import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  photo: String,
  googleId: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
