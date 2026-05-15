import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const items = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch projects", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const created = await Project.create({
      title: body.title,
      description: body.description,
      techStack: Array.isArray(body.techStack) ? body.techStack : [],
      liveUrl: body.liveUrl || "",
      githubUrl: body.githubUrl || "",
      images: Array.isArray(body.images) ? body.images : [],
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create project", error: error.message },
      { status: 500 }
    );
  }
}