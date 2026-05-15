import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.findOne({});
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Setting.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update settings" }, { status: 500 });
  }
}