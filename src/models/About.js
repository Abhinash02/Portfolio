// import mongoose from "mongoose";

// const AboutSchema = new mongoose.Schema(
//   {
//     content: String,
//   },
//   { timestamps: true, collection: "abouts" }
// );

// export default mongoose.models.About || mongoose.model("About", AboutSchema);

import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    content: String,
  },
  { timestamps: true, collection: "abouts" }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);