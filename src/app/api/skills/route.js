import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await connectDB();
    const items = await Skill.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch skills", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const created = await Skill.create({
      name: body.name,
      category: body.category,
      order: Number(body.order) || 0,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create skill", error: error.message },
      { status: 500 }
    );
  }
}