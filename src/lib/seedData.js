// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// import Hero from "@/models/Hero";
// import About from "@/models/About";
// import Skill from "@/models/Skill";
// import Project from "@/models/Project";
// import Experience from "@/models/Experience";
// import Education from "@/models/Education";
// import Social from "@/models/Social";
// import Setting from "@/models/Setting";

// export async function seedPortfolio() {
//   const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });

//   if (!existingUser) {
//     const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
//     await User.create({
//       name: "Abhinash Admin",
//       email: process.env.ADMIN_EMAIL,
//       password: hashed
//     });
//   }

//   if (!(await Hero.findOne())) {
//     await Hero.create({
//       name: "Abhinash",
//       title: "MERN Stack Developer",
//       tagline: "Building scalable full-stack web apps with Next.js, MongoDB, and responsive UI.",
//       resumeUrl: "/resume/Abhinash_Resume.pdf",
//       profileImage: "/uploads/profile.jpg"
//     });
//   }

//   if (!(await About.findOne())) {
//     await About.create({
//       content:
//         "MERN Stack Developer skilled in Next.js, React.js, Express.js, Node.js, and MongoDB. Experienced in REST APIs, Socket.IO, Auth.js, JWT, Stripe, and performance-focused responsive UI development."
//     });
//   }

//   if ((await Skill.countDocuments()) === 0) {
//     await Skill.insertMany([
//       { name: "React.js", category: "Frontend", order: 1 },
//       { name: "Next.js", category: "Frontend", order: 2 },
//       { name: "JavaScript", category: "Frontend", order: 3 },
//       { name: "Tailwind CSS", category: "Frontend", order: 4 },
//       { name: "Node.js", category: "Backend", order: 5 },
//       { name: "Express.js", category: "Backend", order: 6 },
//       { name: "MongoDB", category: "Database", order: 7 },
//       { name: "Mongoose", category: "Database", order: 8 },
//       { name: "Auth.js", category: "Authentication", order: 9 },
//       { name: "JWT", category: "Authentication", order: 10 }
//     ]);
//   }

//   if ((await Project.countDocuments()) === 0) {
//     await Project.insertMany([
//       {
//         title: "DCS PUP Alumni Management Website",
//         description: "Alumni management platform with admin panel and MongoDB integration.",
//         techStack: ["React", "Tailwind CSS", "MongoDB"],
//         liveUrl: "https://dcsalumni.vishalpup.in/",
//         githubUrl: "",
//         featured: true,
//         order: 1
//       },
//       {
//         title: "Quick Decision Maker",
//         description: "Responsive Next.js poll platform with expiry logic and live results.",
//         techStack: ["Next.js", "MongoDB", "Mongoose"],
//         liveUrl: "https://quick-decision-maker.vercel.app",
//         githubUrl: "",
//         featured: true,
//         order: 2
//       },
//       {
//         title: "Student Assignment Submission Portal",
//         description: "Role-based full-stack app with dashboards, assignments, and authentication.",
//         techStack: ["Next.js", "MongoDB"],
//         liveUrl: "https://teachertrack.vercel.app/",
//         githubUrl: "",
//         featured: true,
//         order: 3
//       }
//     ]);
//   }

//   if ((await Experience.countDocuments()) === 0) {
//     await Experience.insertMany([
//       {
//         role: "MERN Stack Developer Intern",
//         company: "Dooritt",
//         location: "Sector 142, Noida, UP",
//         duration: "Aug 2025 – March 2026",
//         points: [
//           "Built and optimized full-stack modules for a tech-driven real estate platform.",
//           "Streamlined property buying workflows to improve operational efficiency.",
//           "Debugged and fixed critical issues on the live site."
//         ],
//         order: 1
//       },
//       {
//         role: "MERN Stack Developer Trainee",
//         company: "Auspicious Soft Pvt. Ltd.",
//         location: "Mohali, Punjab",
//         duration: "Jan 2025 – July 2025",
//         points: [
//           "Built full stack web apps using MVC architecture and reusable components.",
//           "Developed secure REST APIs with CRUD operations, Auth.js, JWT, and validation.",
//           "Created responsive UIs with Tailwind CSS and real-time chat using Socket.IO."
//         ],
//         order: 2
//       }
//     ]);
//   }

//   if ((await Education.countDocuments()) === 0) {
//     await Education.insertMany([
//       {
//         degree: "Master of Computer Applications (MCA)",
//         institute: "Punjabi University, Patiala",
//         score: "7.75 CGPA",
//         duration: "2023-2025",
//         order: 1
//       },
//       {
//         degree: "Bachelor of Computer Science (BCA)",
//         institute: "Panjab University, Chandigarh",
//         score: "82%",
//         duration: "2021-2023",
//         order: 2
//       }
//     ]);
//   }

//   if ((await Social.countDocuments()) === 0) {
//     await Social.insertMany([
//       { platform: "Email", url: "mailto:abhinash.webdev@gmail.com", order: 1 },
//       { platform: "GitHub", url: "https://github.com/", order: 2 },
//       { platform: "LinkedIn", url: "https://linkedin.com/", order: 3 }
//     ]);
//   }

//   if (!(await Setting.findOne())) {
//     await Setting.create({
//       email: "abhinash.webdev@gmail.com",
//       phone: "98145-38354",
//       location: "Moga, Punjab, India"
//     });
//   }
// }


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const User = require("../models/User").default;
const Hero = require("../models/Hero").default;
const About = require("../models/About").default;
const Skill = require("../models/Skill").default;
const Project = require("../models/Project").default;
const Experience = require("../models/Experience").default;
const Education = require("../models/Education").default;
const Social = require("../models/Social").default;
const Setting = require("../models/Setting").default;

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);



  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await User.create({
    name: "Abhinash Admin",
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword
  });

  await Hero.create({
    name: "Abhinash",
    title: "MERN Stack Developer",
    tagline:
      "I build scalable full-stack web applications using Next.js, React.js, Node.js, Express.js, and MongoDB with a strong focus on clean architecture, responsive UI, authentication, and performance.",
    resumeUrl: "/resume/Abhinash_Resume.pdf",
    profileImage: "/uploads/profile.jpg"
  });

  await About.create({
    content:
      "MERN Stack Developer skilled in Next.js, React.js, Express.js, Node.js, and MongoDB. Experienced in Redux Toolkit, REST APIs, Socket.IO, Auth.js, JWT authentication, Stripe integration, and building responsive interfaces with Tailwind CSS."
  });

  await Skill.insertMany([
    { name: "React.js", category: "Frontend", order: 1 },
    { name: "Next.js", category: "Frontend", order: 2 },
    { name: "JavaScript (ES6+)", category: "Frontend", order: 3 },
    { name: "HTML5", category: "Frontend", order: 4 },
    { name: "CSS3", category: "Frontend", order: 5 },
    { name: "Tailwind CSS", category: "Frontend", order: 6 },
    { name: "Node.js", category: "Backend", order: 7 },
    { name: "Express.js", category: "Backend", order: 8 },
    { name: "REST APIs", category: "Backend", order: 9 },
    { name: "Socket.IO", category: "Backend", order: 10 },
    { name: "MongoDB Atlas", category: "Database", order: 11 },
    { name: "Mongoose", category: "Database", order: 12 },
    { name: "Auth.js", category: "Authentication", order: 13 },
    { name: "JWT", category: "Authentication", order: 14 },
    { name: "Git", category: "Tools", order: 15 },
    { name: "GitHub", category: "Tools", order: 16 },
    { name: "Postman", category: "Tools", order: 17 },
    { name: "Cloudinary", category: "Tools", order: 18 },
    { name: "Stripe", category: "Tools", order: 19 },
    { name: "Resend", category: "Tools", order: 20 }
  ]);

  await Experience.insertMany([
    {
      role: "MERN Stack Developer Intern",
      company: "Dooritt",
      location: "Sector 142, Noida, UP",
      duration: "Aug 2025 – March 2026",
      points: [
        "Built and optimized full-stack modules for a tech-driven real estate platform.",
        "Streamlined property buying workflows to improve operational efficiency.",
        "Debugged and fixed critical issues on the live site, ensuring a seamless user experience."
      ],
      order: 1
    },
    {
      role: "MERN Stack Developer Trainee",
      company: "Auspicious Soft Pvt. Ltd.",
      location: "Mohali, Punjab",
      duration: "Jan 2025 – July 2025",
      points: [
        "Built full stack web apps using MVC architecture and reusable components.",
        "Developed secure REST APIs with CRUD operations, Auth.js, JWT, session handling, and validation.",
        "Created responsive UIs with Tailwind CSS and real-time chat using Socket.IO.",
        "Used Git, Postman, and Thunder Client for version control and API testing."
      ],
      order: 2
    }
  ]);

  await Project.insertMany([
    {
      title: "DCS PUP Alumni Management Website",
      description:
        "Developed and deployed an alumni management platform using React, Tailwind CSS, and MongoDB with alumni login and full admin panel support.",
      techStack: ["React", "Tailwind CSS", "MongoDB"],
      liveUrl: "https://dcsalumni.vishalpup.in/",
      githubUrl: "",
      featured: true,
      order: 1
    },
    {
      title: "Quick Decision Maker",
      description:
        "Built a responsive Next.js poll platform for creating, voting, and viewing time-bound polls with expiry logic and live results.",
      techStack: ["Next.js", "MongoDB", "Mongoose"],
      liveUrl: "https://quick-decision-maker.vercel.app",
      githubUrl: "",
      featured: true,
      order: 2
    },
    {
      title: "Student Assignment Submission Portal",
      description:
        "Role-based full-stack application with authentication, dashboards, and assignment management for admin, student, and teacher flows.",
      techStack: ["Next.js", "MongoDB"],
      liveUrl: "https://teachertrack.vercel.app/",
      githubUrl: "",
      featured: true,
      order: 3
    },
    {
      title: "Chat Application",
      description:
        "Engineered a scalable Express backend for a real-time messaging app with JWT authentication, file uploads, and WebSocket integration.",
      techStack: ["Node.js", "Express.js", "JWT", "Socket.IO"],
      liveUrl: "",
      githubUrl: "",
      featured: false,
      order: 4
    }
  ]);

  await Education.insertMany([
    {
      degree: "Master of Computer Applications (MCA)",
      institute: "Punjabi University, Patiala",
      score: "7.75 CGPA",
      duration: "2023-2025",
      order: 1
    },
    {
      degree: "Bachelor of Computer Science (BCA)",
      institute: "Panjab University, Chandigarh",
      score: "82%",
      duration: "2021-2023",
      order: 2
    }
  ]);

  await Social.insertMany([
    { platform: "Email", url: "mailto:abhinash.webdev@gmail.com", order: 1 },
    { platform: "GitHub", url: "https://github.com/abhinash99", order: 2 },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abhinash99", order: 3 }
  ]);

  await Setting.create({
    email: "abhinash.webdev@gmail.com",
    phone: "98145-38354",
    location: "Punjab / Noida, India"
  });

  console.log("Seed completed");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});