// import mongoose from "mongoose";

// const SkillSchema = new mongoose.Schema(
//   {
//     name: String,
//     category: String,
//     order: Number,
//   },
//   { timestamps: true, collection: "skills" }
// );

// export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    order: Number,
  },
  { timestamps: true, collection: "skills" }
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);