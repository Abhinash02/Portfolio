// import { NextResponse } from "next/server";
// import { resend } from "@/lib/resend";
// import { connectDB } from "@/lib/db";
// import ContactMessage from "@/models/ContactMessage";
// import Setting from "@/models/Setting";

// export const runtime = "nodejs";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, subject, message } = body;

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { message: "All required fields must be filled" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     await ContactMessage.create({
//       name: name.trim(),
//       email: email.trim(),
//       subject: subject?.trim() || "",
//       message: message.trim(),
//     });

//     const settings = await Setting.findOne().lean();
//     const toEmail = settings?.email || process.env.ADMIN_EMAIL;

//     if (!toEmail) {
//       return NextResponse.json(
//         { message: "Receiver email is not configured" },
//         { status: 500 }
//       );
//     }

//     const { data, error } = await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
//       to: [toEmail],
//       replyTo: email.trim(),
//       subject: subject?.trim() || `Portfolio contact from ${name.trim()}`,
//       html: `
//         <div style="font-family:Arial,sans-serif;padding:20px">
//           <h2>Message From ${name.trim()}</h2>
//           <p><strong>Name:</strong> ${name.trim()}</p>
//           <p><strong>Email:</strong> ${email.trim()}</p>
//           <p><strong>Subject:</strong> ${subject?.trim() || "No subject"}</p>
//           <p><strong>Message:</strong></p>
//           <p>${message.trim()}</p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error("Resend error:", error);
//       return NextResponse.json(
//         { message: "Failed to send message", error: error.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Message sent successfully",
//         emailId: data?.id,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Contact route error:", error);
//     return NextResponse.json(
//       { message: "Failed to send message", error: error.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import Setting from "@/models/Setting";

export const runtime = "nodejs";

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function contactEmailTemplate({ name, email, subject, message }) {
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeSubject = escapeHtml(subject?.trim() || "No subject");
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;background-color:#020617;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;background-color:#0f172a;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;">
            
            <tr>
              <td style="padding:32px;background:linear-gradient(135deg,#06b6d4 0%,#2563eb 100%);">
                <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.78);font-weight:700;">
                  Abhinash Portfolio
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.3;color:#ffffff;font-weight:800;">
                   New Message From ${safeName}
                </h1>
                <p style="margin:10px 0 0 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.9);">
                  Someone just submitted your portfolio contact form.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                  <tr>
                    <td style="padding-bottom:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:18px;">
                        <tr>
                          <td style="padding:20px;">
                            <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">Name</p>
                            <p style="margin:0;font-size:18px;color:#ffffff;font-weight:700;">${safeName}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:18px;">
                        <tr>
                          <td style="padding:20px;">
                            <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">Email</p>
                            <p style="margin:0;font-size:16px;color:#e2e8f0;">${safeEmail}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:18px;">
                        <tr>
                          <td style="padding:20px;">
                            <p style="margin:0 0 6px 0;font-size:13px;color:#94a3b8;">Subject</p>
                            <p style="margin:0;font-size:16px;color:#e2e8f0;font-weight:600;">${safeSubject}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:18px;">
                  <tr>
                    <td style="padding:24px;">
                      <p style="margin:0 0 12px 0;font-size:13px;color:#94a3b8;">Message</p>
                      <p style="margin:0;font-size:16px;line-height:1.8;color:#f8fafc;">${safeMessage}</p>
                    </td>
                  </tr>
                </table>

                <table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
                  <tr>
                    <td bgcolor="#06b6d4" style="border-radius:999px;">
                      <a
                        href="mailto:${safeEmail}"
                        style="display:inline-block;padding:14px 22px;font-size:14px;font-weight:700;color:#082f49;text-decoration:none;border-radius:999px;"
                      >
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 32px 32px;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;">
                  This message was sent from your portfolio website contact form.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "",
      message: message.trim(),
    });

    const settings = await Setting.findOne().lean();
    const toEmail = settings?.email || process.env.ADMIN_EMAIL;

    if (!toEmail) {
      return NextResponse.json(
        { message: "Receiver email is not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: [toEmail],
      replyTo: email.trim(),
      subject: subject?.trim() || `Portfolio contact from ${name.trim()}`,
      html: contactEmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send message", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully",
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { message: "Failed to send message", error: error.message },
      { status: 500 }
    );
  }
}