import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String},
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);


const oauthUserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, required: true }, // For Google OAuth
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const OauthUser = mongoose.model("OauthUser", oauthUserSchema);