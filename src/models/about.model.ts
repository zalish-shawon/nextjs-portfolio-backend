import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  years: String,
  description: String,
});

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: String,
  bio: String,
  experience: [experienceSchema],
  skills: [String],
});

export default mongoose.models.About || mongoose.model("About", aboutSchema);
