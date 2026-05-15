// import mongoose from "mongoose";

// const EducationSchema = new mongoose.Schema(
//   {
//     degree: String,
//     institute: String,
//     score: String,
//     duration: String,
//     order: Number,
//   },
//   { timestamps: true, collection: "educations" }
// );

// export default mongoose.models.Education || mongoose.model("Education", EducationSchema);
import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    score: { type: String, default: "" },
    duration: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "educations" }
);

export default mongoose.models.Education ||
  mongoose.model("Education", EducationSchema);