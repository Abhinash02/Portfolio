import { connectDB } from "@/lib/db";
import { seedPortfolio } from "@/lib/seedData";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Seed route is disabled in production" },
      { status: 403 }
    );
  }

  await connectDB();
  await seedPortfolio();

  return NextResponse.json({ message: "Database seeded successfully" });
}