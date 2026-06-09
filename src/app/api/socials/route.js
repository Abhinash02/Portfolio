import { connectDB } from "@/lib/db";
import Social from "@/models/Social";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";

export async function POST(req) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  await connectDB();
  const body = await req.json();
  const item = await Social.create(body);
  return NextResponse.json(item);
}