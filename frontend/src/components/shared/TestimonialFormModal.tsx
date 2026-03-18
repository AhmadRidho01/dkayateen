"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { ITestimonial } from "@/types";
import { X } from "lucide-react";

interface TestimonialFormModalProps {
  testimonial: ITestimonial | null;
  onClose: () => void;
}

export default function TestimonialFormModal({
  testimonial,
  onClose,
}: TestimonialFormModalProps) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    avatar: "",
    isVisible: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (testimonial) {
      setForm({
        name: testimonial.name,
        role: testimonial.role,
        message: testimonial.message,
        avatar: testimonial.avatar,
        isVisible: testimonial.isVisible,
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (testimonial) {
        await axiosInstance.put(`/testimonials/${testimonial._id}`, form);
      } else {
        await axiosInstance.post("/testimonials", form);
      }
      onClose();
    } catch {
      setError("Gagal menyimpan testimoni. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-xl w-full max-w-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">
              {testimonial ? "Edit Testimoni" : "Tambah Testimoni"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nama
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm"
                placeholder="Nama pelanggan"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Peran
              </label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm"
                placeholder="Contoh: Pelanggan Setia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Pesan
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm resize-none"
                placeholder="Isi testimoni"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                URL Avatar{" "}
                <span className="text-slate-400 font-normal">(opsional)</span>
              </label>
              <input
                type="url"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm"
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isVisible"
                checked={form.isVisible}
                onChange={(e) =>
                  setForm({ ...form, isVisible: e.target.checked })
                }
                className="rounded"
              />
              <label
                htmlFor="isVisible"
                className="text-sm font-medium text-slate-700"
              >
                Tampilkan di website
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
