import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import Experience from "@/models/Experience";

export async function GET() {
  try {
    await connectDB();
    const items = await Experience.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch experiences", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const body = await req.json();

    const created = await Experience.create({
      role: body.role,
      company: body.company,
      location: body.location || "",
      duration: body.duration,
      points: Array.isArray(body.points) ? body.points : [],
      order: Number(body.order) || 0,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create experience", error: error.message },
      { status: 500 }
    );
  }
}