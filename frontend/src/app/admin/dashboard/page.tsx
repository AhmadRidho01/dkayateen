"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import type { IApiResponse, IProduct, ITestimonial } from "@/types";
import { Package, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { containerStyle } from "@/constants";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, testimonialsRes] = await Promise.all([
          axiosInstance.get<IApiResponse<IProduct[]>>("/products"),
          axiosInstance.get<IApiResponse<ITestimonial[]>>("/testimonials/all"),
        ]);
        if (productsRes.data.data)
          setProductCount(productsRes.data.data.length);
        if (testimonialsRes.data.data)
          setTestimonialCount(testimonialsRes.data.data.length);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Produk",
      value: productCount,
      icon: Package,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      label: "Total Testimoni",
      value: testimonialCount,
      icon: MessageSquare,
      color: "#16a34a",
      bg: "#f0fdf4",
    },
    {
      label: "Status Website",
      value: "Online",
      icon: Globe,
      color: "#059669",
      bg: "#ecfdf5",
    },
  ];

  const quickLinks = [
    {
      href: "/admin/dashboard/products",
      label: "Kelola Produk",
      description: "Tambah, edit, atau hapus produk",
      icon: Package,
    },
    {
      href: "/admin/dashboard/testimonials",
      label: "Kelola Testimoni",
      description: "Manage testimoni pelanggan",
      icon: MessageSquare,
    },
  ];

  return (
    <div
      style={{
        ...containerStyle,
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "2rem" }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            letterSpacing: "-0.025em",
            color: "#0f172a",
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
          }}
        >
          Selamat datang kembali di panel admin D'Kayateen
        </p>
      </motion.div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid #f1f5f9",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "0.5rem",
                  backgroundColor: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Icon size={18} style={{ color: stat.color }} />
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#0f172a",
                  marginTop: "0.25rem",
                }}
              >
                {loading ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: "2rem",
                      height: "1.75rem",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "0.25rem",
                    }}
                  />
                ) : (
                  stat.value
                )}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: "600",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}
        >
          Aksi Cepat
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "0.5rem",
                      backgroundColor: "#f8fafc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} style={{ color: "#475569" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#0f172a",
                        fontSize: "0.875rem",
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.75rem",
                        marginTop: "0.125rem",
                      }}
                    >
                      {link.description}
                    </p>
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: "#cbd5e1" }} />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
