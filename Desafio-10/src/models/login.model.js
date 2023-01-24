import mongoose from "mongoose";

const userLogin = mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 100,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default userLogin;