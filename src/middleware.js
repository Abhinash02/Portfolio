import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    if (isLoginPage && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/admin/login") return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
