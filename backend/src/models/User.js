import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["patient", "admin"], default: "patient" },
  patientId: String,
});

export default mongoose.model("User", userSchema);
