export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/hero/:path*", "/admin/about/:path*", "/admin/skills/:path*", "/admin/projects/:path*", "/admin/experience/:path*", "/admin/education/:path*", "/admin/socials/:path*", "/admin/settings/:path*"]
};