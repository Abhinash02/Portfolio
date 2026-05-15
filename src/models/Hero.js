// import mongoose from "mongoose";

// const SocialLinkSchema = new mongoose.Schema(
//   {
//     label: { type: String, default: "" },
//     url: { type: String, default: "" },
//     icon: { type: String, default: "" },
//     order: { type: Number, default: 0 },
//   },
//   { _id: true }
// );

// const HighlightSchema = new mongoose.Schema(
//   {
//     label: { type: String, default: "" },
//     value: { type: String, default: "" },
//     order: { type: Number, default: 0 },
//   },
//   { _id: true }
// );

// const HeroSchema = new mongoose.Schema(
//   {
//     availabilityText: { type: String, default: "" },
//     name: { type: String, default: "" },
//     title: { type: String, default: "" },
//     tagline: { type: String, default: "" },
//     resumeUrl: { type: String, default: "" },
//     resumePublicId: { type: String, default: "" },
//     socialLinks: { type: [SocialLinkSchema], default: [] },
//     highlights: { type: [HighlightSchema], default: [] },
//   },
//   { timestamps: true, collection: "hero" }
// );

// export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);

import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
    icon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const HighlightSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    value: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const HeroSchema = new mongoose.Schema(
  {
    availabilityText: { type: String, default: "" },
    name: { type: String, default: "" },
    title: { type: String, default: "" },
    tagline: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    resumePublicId: { type: String, default: "" },
    socialLinks: { type: [SocialLinkSchema], default: [] },
    highlights: { type: [HighlightSchema], default: [] },
  },
  { timestamps: true, collection: "hero" }
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);