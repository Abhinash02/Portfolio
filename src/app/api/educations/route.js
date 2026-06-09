import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import Education from "@/models/Education";

export async function GET() {
  try {
    await connectDB();
    const items = await Education.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch educations", error: error.message },
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

    const created = await Education.create({
      degree: body.degree,
      institute: body.institute,
      score: body.score || "",
      duration: body.duration,
      order: Number(body.order) || 0,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create education", error: error.message },
      { status: 500 }
    );
  }
}