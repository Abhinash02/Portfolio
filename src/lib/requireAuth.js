import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      session: null,
      unauthorized: NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      ),
    };
  }

  return { session, unauthorized: null };
}
