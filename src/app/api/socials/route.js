import { connectDB } from "@/lib/db";
import Social from "@/models/Social";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const item = await Social.create(body);
  return NextResponse.json(item);
}