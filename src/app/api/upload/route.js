// import { NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file) {
//       return NextResponse.json(
//         { message: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploaded = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           folder: "abhinash-portfolio/projects",
//           resource_type: "image",
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );

//       stream.end(buffer);
//     });

//     return NextResponse.json({
//       message: "Upload successful",
//       url: uploaded.secure_url,
//       public_id: uploaded.public_id,
//       width: uploaded.width,
//       height: uploaded.height,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Upload failed",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
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
          folder: "abhinash-portfolio/projects",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      message: "Upload successful",
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Upload failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}