// import { connectDB } from "./db";
// import Hero from "@/models/Hero";
// import About from "@/models/About";
// import Skill from "@/models/Skill";
// import Project from "@/models/Project";
// import Experience from "@/models/Experience";
// import Education from "@/models/Education";
// import Social from "@/models/Social";
// import Setting from "@/models/Setting";

// export async function getPortfolioData() {
//   await connectDB();

//   const [hero, about, skills, projects, experience, education, socials, settings] =
//     await Promise.all([
//       Hero.findOne().lean(),
//       About.findOne().lean(),
//       Skill.find().sort({ order: 1 }).lean(),
//       Project.find().sort({ order: 1 }).lean(),
//       Experience.find().sort({ order: 1 }).lean(),
//       Education.find().sort({ order: 1 }).lean(),
//       Social.find().sort({ order: 1 }).lean(),
//       Setting.findOne().lean()
//     ]);

//   return {
//     hero: JSON.parse(JSON.stringify(hero)),
//     about: JSON.parse(JSON.stringify(about)),
//     skills: JSON.parse(JSON.stringify(skills)),
//     projects: JSON.parse(JSON.stringify(projects)),
//     experience: JSON.parse(JSON.stringify(experience)),
//     education: JSON.parse(JSON.stringify(education)),
//     socials: JSON.parse(JSON.stringify(socials)),
//     settings: JSON.parse(JSON.stringify(settings))
//   };
// }


// import { connectDB } from "./db";
// import Hero from "@/models/Hero";
// import About from "@/models/About";
// import Skill from "@/models/Skill";
// import Project from "@/models/Project";
// import Experience from "@/models/Experience";
// import Education from "@/models/Education";
// import Social from "@/models/Social";
// import Setting from "@/models/Setting";

// export async function getPortfolioData() {
//   await connectDB();

//   const [hero, about, skills, projects, experience, education, socials, settings] =
//     await Promise.all([
//       Hero.findOne({}).lean(),
//       About.findOne({}).lean(),
//       Skill.find({}).sort({ order: 1 }).lean(),
//       Project.find({}).sort({ order: 1 }).lean(),
//       Experience.find({}).sort({ order: 1 }).lean(),
//       Education.find({}).sort({ order: 1 }).lean(),
//       Social.find({}).sort({ order: 1 }).lean(),
//       Setting.findOne({}).lean(),
//     ]);

//   return JSON.parse(
//     JSON.stringify({
//       hero,
//       about,
//       skills,
//       projects,
//       experience,
//       education,
//       socials,
//       settings,
//     })
//   );
// }

// import { connectDB } from "./db";
// import Hero from "@/models/Hero";
// import About from "@/models/About";
// import Skill from "@/models/Skill";
// import Project from "@/models/Project";
// import Experience from "@/models/Experience";
// import Education from "@/models/Education";
// import Social from "@/models/Social";
// import Setting from "@/models/Setting";

// export async function getPortfolioData() {
//   await connectDB();

//   const [hero, about, skills, projects, experience, education, socials, settings] =
//     await Promise.all([
//       Hero.findOne({}).lean(),
//       About.findOne({}).lean(),
//       Skill.find({}).sort({ order: 1 }).lean(),
//       Project.find({}).sort({ order: 1 }).lean(),
//       Experience.find({}).sort({ order: 1 }).lean(),
//       Education.find({}).sort({ order: 1 }).lean(),
//       Social.find({}).sort({ order: 1 }).lean(),
//       Setting.findOne({}).lean(),
//     ]);

//   return JSON.parse(
//     JSON.stringify({
//       hero,
//       about,
//       skills,
//       projects,
//       experience,
//       education,
//       socials,
//       settings,
//     })
//   );
// }

// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";

// import Hero from "@/models/Hero";
// import About from "@/models/About";
// import Skill from "@/models/Skill";
// import Project from "@/models/Project";
// import Experience from "@/models/Experience";
// import Education from "@/models/Education";
// import Social from "@/models/Social";
// import Setting from "@/models/Setting";

// export async function getPortfolioData() {
//   await connectDB();

//   console.log("Connected DB:", mongoose.connection.name);

//   const collections = await mongoose.connection.db.listCollections().toArray();
//   console.log("Collections:", collections.map((c) => c.name));

//   const [hero, about, skills, projects, experience, education, socials, settings] =
//     await Promise.all([
//       Hero.findOne({}).lean(),
//       About.findOne({}).lean(),
//       Skill.find({}).sort({ order: 1 }).lean(),
//       Project.find({}).sort({ order: 1 }).lean(),
//       Experience.find({}).sort({ order: 1 }).lean(),
//       Education.find({}).sort({ order: 1 }).lean(),
//       Social.find({}).sort({ order: 1 }).lean(),
//       Setting.findOne({}).lean(),
//     ]);

//   return JSON.parse(
//     JSON.stringify({
//       hero,
//       about,
//       skills,
//       projects,
//       experience,
//       education,
//       socials,
//       settings,
//     })
//   );
// }

import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

import Hero from "@/models/Hero";
import About from "@/models/About";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Social from "@/models/Social";
import Setting from "@/models/Setting";

export async function getPortfolioData() {
  await connectDB();

  const [hero, about, skills, projects, experience, education, socials, settings] =
    await Promise.all([
      Hero.findOne({}).lean(),
      About.findOne({}).lean(),
      Skill.find({}).sort({ order: 1 }).lean(),
      Project.find({}).sort({ order: 1 }).lean(),
      Experience.find({}).sort({ order: 1 }).lean(),
      Education.find({}).sort({ order: 1 }).lean(),
      Social.find({}).sort({ order: 1 }).lean(),
      Setting.findOne({}).lean(),
    ]);

  return JSON.parse(
    JSON.stringify({
      hero,
      about,
      skills,
      projects,
      experience,
      education,
      socials,
      settings,
    })
  );
}