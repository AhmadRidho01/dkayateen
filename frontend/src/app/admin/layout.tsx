"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, login } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Rehydrate dari localStorage setelah mount
    const token = localStorage.getItem("token");
    if (token) login(token);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [mounted, isAuthenticated, isLoginPage, router]);

  if (!mounted) return null;

  if (isLoginPage) return <>{children}</>;

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
