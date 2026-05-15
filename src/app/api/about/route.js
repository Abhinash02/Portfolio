import { connectDB } from "@/lib/db";
import About from "@/models/About";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const existing = await About.findOne();

  if (existing) {
    await About.findByIdAndUpdate(existing._id, body, { new: true });
  } else {
    await About.create(body);
  }

  return NextResponse.json({ message: "About saved" });
}