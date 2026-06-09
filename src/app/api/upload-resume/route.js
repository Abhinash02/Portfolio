import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "abhinash-portfolio/resume",
          resource_type: "raw",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      message: "Resume uploaded successfully",
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Resume upload failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}