import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const body = await req.json();
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: body.folder || "abhinash-portfolio/projects",
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      timestamp,
      signature,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: body.folder || "abhinash-portfolio/projects",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}