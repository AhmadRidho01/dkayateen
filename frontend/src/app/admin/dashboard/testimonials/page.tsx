"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IApiResponse, ITestimonial } from "@/types";
import { Plus, Pencil, Trash2, MessageSquare, Eye, EyeOff } from "lucide-react";
import TestimonialFormModal from "@/components/shared/TestimonialFormModal";
import { containerStyle } from "@/constants";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<ITestimonial | null>(null);

  const fetchTestimonials = async () => {
    try {
      const { data } =
        await axiosInstance.get<IApiResponse<ITestimonial[]>>(
          "/testimonials/all",
        );
      if (data.data) setTestimonials(data.data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    try {
      await axiosInstance.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const handleToggleVisibility = async (testimonial: ITestimonial) => {
    try {
      await axiosInstance.put(`/testimonials/${testimonial._id}`, {
        isVisible: !testimonial.isVisible,
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    }
  };

  return (
    <div
      style={{
        ...containerStyle,
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              letterSpacing: "-0.025em",
              color: "#0f172a",
            }}
          >
            Testimoni
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            Kelola testimoni pelanggan
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTestimonial(null);
            setIsModalOpen(true);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            backgroundColor: "#0f172a",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: "500",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Plus size={16} />
          Tambah Testimoni
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: "0.75rem",
                height: "5rem",
                border: "1px solid #f1f5f9",
              }}
            />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            paddingTop: "6rem",
            paddingBottom: "6rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            border: "1px solid #f1f5f9",
          }}
        >
          <MessageSquare
            size={40}
            style={{ color: "#e2e8f0", margin: "0 auto 0.75rem" }}
          />
          <p style={{ color: "#64748b" }}>Belum ada testimoni.</p>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "1.25rem 1.5rem",
                border: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <img
                src={
                  testimonial.avatar ||
                  `https://ui-avatars.com/api/?name=${testimonial.name}&background=e2e8f0&color=475569`
                }
                alt={testimonial.name}
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "9999px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.375rem",
                    flexWrap: "wrap",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      color: "#0f172a",
                      fontSize: "0.875rem",
                    }}
                  >
                    {testimonial.name}
                  </p>
                  <span style={{ color: "#cbd5e1", fontSize: "0.75rem" }}>
                    •
                  </span>
                  <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    {testimonial.role}
                  </p>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.125rem 0.625rem",
                      borderRadius: "9999px",
                      backgroundColor: testimonial.isVisible
                        ? "#f0fdf4"
                        : "#f8fafc",
                      color: testimonial.isVisible ? "#16a34a" : "#94a3b8",
                    }}
                  >
                    {testimonial.isVisible ? "Tampil" : "Disembunyikan"}
                  </span>
                </div>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {testimonial.message}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => handleToggleVisibility(testimonial)}
                  style={{
                    padding: "0.5rem",
                    color: "#94a3b8",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                  title={testimonial.isVisible ? "Sembunyikan" : "Tampilkan"}
                >
                  {testimonial.isVisible ? (
                    <EyeOff size={15} />
                  ) : (
                    <Eye size={15} />
                  )}
                </button>
                <button
                  onClick={() => {
                    setSelectedTestimonial(testimonial);
                    setIsModalOpen(true);
                  }}
                  style={{
                    padding: "0.5rem",
                    color: "#94a3b8",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  style={{
                    padding: "0.5rem",
                    color: "#94a3b8",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <TestimonialFormModal
          testimonial={selectedTestimonial}
          onClose={() => {
            setIsModalOpen(false);
            fetchTestimonials();
          }}
        />
      )}
    </div>
  );
}
