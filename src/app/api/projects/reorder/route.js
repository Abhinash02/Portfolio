import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import Project from "@/models/Project";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Bulk reorder projects
export async function PUT(req) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();
    const { orders } = await req.json();

    // orders is an array of { id, order }
    if (!Array.isArray(orders)) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    const bulkOps = orders.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: Number(order) } },
      },
    }));

    await Project.bulkWrite(bulkOps);

    const updated = await Project.find({})
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to reorder projects", error: error.message },
      { status: 500 }
    );
  }
}
