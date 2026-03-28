"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-72 mt-16 lg:mt-0 overflow-x-hidden">
        <AdminHeader />
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
