import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, default: "user" }, // "admin" or "user"
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
