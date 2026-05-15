import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Skill.findByIdAndUpdate(
      params.id,
      {
        name: body.name,
        category: body.category,
        order: Number(body.order) || 0,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update skill", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Skill.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Skill deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete skill", error: error.message },
      { status: 500 }
    );
  }
}