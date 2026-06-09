import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import Experience from "@/models/Experience";

export async function PUT(req, { params }) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const body = await req.json();

    const updated = await Experience.findByIdAndUpdate(
      params.id,
      {
        role: body.role,
        company: body.company,
        location: body.location || "",
        duration: body.duration,
        points: Array.isArray(body.points) ? body.points : [],
        order: Number(body.order) || 0,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update experience", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    await Experience.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Experience deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete experience", error: error.message },
      { status: 500 }
    );
  }
}