import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    minPrice: { type: String, required: true },
    maxPrice: { type: String, required: true },
    postingDate: { type: Date, required: true },
    experienceLevel: { type: String, required: true },
    salaryType: { type: String, required: true },
    jobLocation: { type: String, required: true },
    skills: { type: [mongoose.Schema.Types.Mixed], required: true },
    companyLogo: { type: String, required: true },
    employmentType: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: { type:mongoose.Schema.ObjectId,
      ref:"user",
       required: true }
  });

export default mongoose.model("Job", JobSchema);
