
// import mongoose from "mongoose";

// const ProjectSchema = new mongoose.Schema(
//   {
//     title: String,
//     description: String,
//     techStack: [String],
//     liveUrl: String,
//     githubUrl: String,
//     images: [String],
//     featured: Boolean,
//     order: Number,
//   },
//   { timestamps: true, collection: "projects" }
// );

// export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);

import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    techStack: [String],
    liveUrl: String,
    githubUrl: String,
    images: [String],
    featured: Boolean,
    order: Number,
  },
  { timestamps: true, collection: "projects" }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);