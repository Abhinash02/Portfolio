// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import Hero from "@/models/Hero";

// export const runtime = "nodejs";

// export async function GET() {
//   try {
//     await connectDB();

//     let hero = await Hero.findOne().lean();

//     if (!hero) {
//       const createdHero = await Hero.create({
//         availabilityText: "Available for full-stack opportunities",
//         name: "Abhinash",
//         title: "MERN Developer",
//         tagline:
//           "I build scalable full-stack web applications using Next.js, React.js, Node.js, Express.js, and MongoDB.",
//         resumeUrl: "",
//         resumePublicId: "",
//         socialLinks: [],
//         highlights: [
//           { label: "Core Focus", value: "MERN Stack", order: 1 },
//           { label: "Specialty", value: "Admin Panels", order: 2 },
//           { label: "Backend", value: "REST APIs", order: 3 },
//           { label: "UI", value: "Responsive", order: 4 },
//         ],
//       });

//       hero = createdHero.toObject();
//     }

//     return NextResponse.json({
//       success: true,
//       hero,
//     });
//   } catch (error) {
//     console.error("GET /api/hero error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch hero",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const sanitizedSocialLinks = Array.isArray(body.socialLinks)
//       ? body.socialLinks
//           .filter((item) => item?.label?.trim() || item?.url?.trim() || item?.icon?.trim())
//           .map((item, index) => ({
//             label: item?.label?.trim() || "",
//             url: item?.url?.trim() || "",
//             icon: item?.icon?.trim() || "",
//             order: Number(item?.order) || index + 1,
//           }))
//       : [];

//     const sanitizedHighlights = Array.isArray(body.highlights)
//       ? body.highlights
//           .filter((item) => item?.label?.trim() || item?.value?.trim())
//           .map((item, index) => ({
//             label: item?.label?.trim() || "",
//             value: item?.value?.trim() || "",
//             order: Number(item?.order) || index + 1,
//           }))
//       : [];

//     let hero = await Hero.findOne();

//     if (!hero) {
//       hero = await Hero.create({
//         availabilityText: body.availabilityText?.trim() || "",
//         name: body.name?.trim() || "",
//         title: body.title?.trim() || "",
//         tagline: body.tagline?.trim() || "",
//         resumeUrl: body.resumeUrl?.trim() || "",
//         resumePublicId: body.resumePublicId?.trim() || "",
//         socialLinks: sanitizedSocialLinks,
//         highlights: sanitizedHighlights,
//       });
//     } else {
//       hero.availabilityText = body.availabilityText?.trim() || "";
//       hero.name = body.name?.trim() || "";
//       hero.title = body.title?.trim() || "";
//       hero.tagline = body.tagline?.trim() || "";
//       hero.resumeUrl = body.resumeUrl?.trim() || "";
//       hero.resumePublicId = body.resumePublicId?.trim() || "";
//       hero.socialLinks = sanitizedSocialLinks;
//       hero.highlights = sanitizedHighlights;

//       await hero.save();
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Hero updated successfully",
//       hero,
//     });
//   } catch (error) {
//     console.error("PUT /api/hero error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to update hero",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }









import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import Hero from "@/models/Hero";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    let hero = await Hero.findOne().lean();

    if (!hero) {
      const createdHero = await Hero.create({
        availabilityText: "Available for full-stack opportunities",
        name: "Abhinash",
        title: "MERN Developer",
        tagline:
          "I build scalable full-stack web applications using Next.js, React.js, Node.js, Express.js, and MongoDB.",
        resumeUrl: "",
        resumePublicId: "",
        profileImage: "",
        profileImagePublicId: "",
        socialLinks: [],
        highlights: [
          { label: "Core Focus", value: "MERN Stack", order: 1 },
          { label: "Specialty", value: "Admin Panels", order: 2 },
          { label: "Backend", value: "REST APIs", order: 3 },
          { label: "UI", value: "Responsive", order: 4 },
        ],
      });

      hero = createdHero.toObject();
    }

    return NextResponse.json({ success: true, hero });
  } catch (error) {
    console.error("GET /api/hero error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch hero", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const { unauthorized } = await requireAuth();
  if (unauthorized) return unauthorized;

  try {
    await connectDB();

    console.log("Hero collection:", Hero.collection.name);

    const body = await req.json();
    console.log("Incoming hero payload:", body);

    const sanitizedSocialLinks = Array.isArray(body.socialLinks)
      ? body.socialLinks
          .filter((item) => item?.label?.trim() || item?.url?.trim() || item?.icon?.trim())
          .map((item, index) => ({
            label: item?.label?.trim() || "",
            url: item?.url?.trim() || "",
            icon: item?.icon?.trim() || "",
            order: Number(item?.order) || index + 1,
          }))
      : [];

    const sanitizedHighlights = Array.isArray(body.highlights)
      ? body.highlights
          .filter((item) => item?.label?.trim() || item?.value?.trim())
          .map((item, index) => ({
            label: item?.label?.trim() || "",
            value: item?.value?.trim() || "",
            order: Number(item?.order) || index + 1,
          }))
      : [];

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({
        availabilityText: body.availabilityText?.trim() || "",
        name: body.name?.trim() || "",
        title: body.title?.trim() || "",
        tagline: body.tagline?.trim() || "",
        resumeUrl: body.resumeUrl?.trim() || "",
        resumePublicId: body.resumePublicId?.trim() || "",
        profileImage: body.profileImage?.trim() || "",
        profileImagePublicId: body.profileImagePublicId?.trim() || "",
        socialLinks: sanitizedSocialLinks,
        highlights: sanitizedHighlights,
      });
    } else {
      hero.availabilityText = body.availabilityText?.trim() || "";
      hero.name = body.name?.trim() || "";
      hero.title = body.title?.trim() || "";
      hero.tagline = body.tagline?.trim() || "";
      hero.resumeUrl = body.resumeUrl?.trim() || "";
      hero.resumePublicId = body.resumePublicId?.trim() || "";
      hero.profileImage = body.profileImage?.trim() || "";
      hero.profileImagePublicId = body.profileImagePublicId?.trim() || "";
      hero.socialLinks = sanitizedSocialLinks;
      hero.highlights = sanitizedHighlights;
    }

    await hero.save();

    const updatedHero = await Hero.findById(hero._id).lean();
    console.log("Saved hero:", updatedHero);

    return NextResponse.json({
      success: true,
      message: "Hero updated successfully",
      hero: updatedHero,
    });
  } catch (error) {
    console.error("PUT /api/hero error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update hero", error: error.message },
      { status: 500 }
    );
  }
}