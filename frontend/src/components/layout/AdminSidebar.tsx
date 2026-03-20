"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { SITE_NAME } from "@/constants";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/products", label: "Produk", icon: Package },
  {
    href: "/admin/dashboard/testimonials",
    label: "Testimoni",
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <aside
      style={{
        width: "15rem",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <h2 style={{ color: "white", fontWeight: "700", fontSize: "1rem" }}>
          {SITE_NAME}
        </h2>
        <p
          style={{
            color: "#475569",
            fontSize: "0.75rem",
            marginTop: "0.125rem",
          }}
        >
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.125rem",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.625rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                textDecoration: "none",
                transition: "all 0.2s",
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
                color: isActive ? "white" : "#64748b",
              }}
            >
              <Icon size={16} />
              {item.label}
              {isActive && (
                <span
                  style={{
                    marginLeft: "auto",
                    width: "0.375rem",
                    height: "0.375rem",
                    borderRadius: "9999px",
                    backgroundColor: "#4ade80",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div
        style={{
          padding: "0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "0.125rem",
        }}
      >
        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.625rem 0.75rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            textDecoration: "none",
            color: "#64748b",
            transition: "all 0.2s",
          }}
        >
          <ExternalLink size={16} />
          Lihat Website
        </Link>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.625rem 0.75rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#64748b",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.2s",
          }}
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
