import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  socialHandle: {
    type: String,
    required: true,
  },
//   images: [String],
});

export const User = new mongoose.model("User", UserSchema);
