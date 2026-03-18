"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IApiResponse, IProduct, ITestimonial } from "@/types";
import { Package, MessageSquare, CheckCircle } from "lucide-react";

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
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Testimoni",
      value: testimonialCount,
      icon: MessageSquare,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Status Website",
      value: "Online",
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Selamat datang di panel admin D'Kayateen
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}
              >
                <Icon size={20} />
              </div>
              <p className="text-slate-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {loading ? "..." : stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
