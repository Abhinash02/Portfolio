
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
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "projects" }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);