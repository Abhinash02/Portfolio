import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const { email, resetSecret, newPassword } = await req.json();

    if (!email || !resetSecret || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!process.env.ADMIN_RESET_SECRET) {
      return NextResponse.json(
        { message: "Password reset is not configured. Set ADMIN_RESET_SECRET in your environment." },
        { status: 503 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (resetSecret !== process.env.ADMIN_RESET_SECRET) {
      return NextResponse.json(
        { message: "Invalid reset secret" },
        { status: 401 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Failed to reset password", error: error.message },
      { status: 500 }
    );
  }
}
