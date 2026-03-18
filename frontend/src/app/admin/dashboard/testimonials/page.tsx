"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IApiResponse, ITestimonial } from "@/types";
import { Plus, Pencil, Trash2, MessageSquare, Eye, EyeOff } from "lucide-react";
import TestimonialFormModal from "@/components/shared/TestimonialFormModal";

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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Testimoni
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola testimoni pelanggan
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTestimonial(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Tambah Testimoni
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-24 animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
          <MessageSquare size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Belum ada testimoni.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-5 border border-slate-100 flex items-start gap-4"
            >
              <img
                src={
                  testimonial.avatar ||
                  `https://ui-avatars.com/api/?name=${testimonial.name}&background=e2e8f0&color=475569`
                }
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-slate-900 text-sm">
                    {testimonial.name}
                  </p>
                  <span className="text-xs text-slate-400">•</span>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      testimonial.isVisible
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {testimonial.isVisible ? "Tampil" : "Disembunyikan"}
                  </span>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2">
                  {testimonial.message}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleToggleVisibility(testimonial)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title={testimonial.isVisible ? "Sembunyikan" : "Tampilkan"}
                >
                  {testimonial.isVisible ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
                <button
                  onClick={() => {
                    setSelectedTestimonial(testimonial);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
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
