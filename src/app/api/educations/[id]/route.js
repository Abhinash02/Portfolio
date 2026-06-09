import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import Education from "@/models/Education";

export async function PUT(req, { params }) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const body = await req.json();

    const updated = await Education.findByIdAndUpdate(
      params.id,
      {
        degree: body.degree,
        institute: body.institute,
        score: body.score || "",
        duration: body.duration,
        order: Number(body.order) || 0,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update education", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    await Education.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Education deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete education", error: error.message },
      { status: 500 }
    );
  }
}