import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Project.findByIdAndUpdate(
      params.id,
      {
        title: body.title,
        description: body.description,
        techStack: Array.isArray(body.techStack) ? body.techStack : [],
        liveUrl: body.liveUrl || "",
        githubUrl: body.githubUrl || "",
        images: Array.isArray(body.images) ? body.images : [],
        featured: Boolean(body.featured),
        order: Number(body.order) || 0,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update project", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete project", error: error.message },
      { status: 500 }
    );
  }
}