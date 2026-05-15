// import mongoose from "mongoose";

// const SettingSchema = new mongoose.Schema(
//   {
//     email: String,
//     phone: String,
//     location: String,
//   },
//   { timestamps: true, collection: "settings" }
// );

// export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    location: String,
    github: String,
    linkedin: String,
    resumeUrl: String,
    portfolioTitle: String,
    heroTitle: String,
    heroTagline: String,
  },
  { timestamps: true, collection: "settings" }
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);