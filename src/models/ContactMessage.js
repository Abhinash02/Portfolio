import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);