require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const { seedPortfolio } = require("../src/lib/seedData");

async function runSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await seedPortfolio();
    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

runSeed();