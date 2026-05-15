import { connectDB } from "@/lib/db";
import { seedPortfolio } from "@/lib/seedData";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  await seedPortfolio();
  return NextResponse.json({ message: "Database seeded successfully" });
}