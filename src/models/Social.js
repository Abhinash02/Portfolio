// import mongoose from "mongoose";

// const SocialSchema = new mongoose.Schema(
//   {
//     platform: String,
//     url: String,
//     order: Number,
//   },
//   { timestamps: true, collection: "socials" }
// );

// export default mongoose.models.Social || mongoose.model("Social", SocialSchema);
import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema(
  {
    platform: String,
    url: String,
    order: Number,
  },
  { timestamps: true, collection: "socials" }
);

export default mongoose.models.Social || mongoose.model("Social", SocialSchema);