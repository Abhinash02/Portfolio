import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminPanelLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#05050f] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.06),transparent_25%)]" />
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col md:pl-0">
          <AdminHeader user={session.user} />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
