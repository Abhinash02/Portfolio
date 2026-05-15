// import mongoose from "mongoose";

// const ExperienceSchema = new mongoose.Schema(
//   {
//     role: String,
//     company: String,
//     location: String,
//     duration: String,
//     points: [String],
//     order: Number,
//   },
//   {
//     timestamps: true,
//     collection: "experiences",
//   }
// );

// export default mongoose.models.Experience ||
//   mongoose.model("Experience", ExperienceSchema);

import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: "" },
    duration: { type: String, required: true },
    points: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "experiences" }
);

const Experience =
  mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);

export default Experience;