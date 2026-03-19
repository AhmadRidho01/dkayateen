"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { ITestimonial, IApiResponse } from "@/types";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } =
          await axiosInstance.get<IApiResponse<ITestimonial[]>>(
            "/testimonials",
          );
        if (data.data) setTestimonials(data.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-medium tracking-widest uppercase text-xs mb-3">
            Kata Mereka
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Testimoni Pelanggan
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami
          </p>
        </motion.div>

        {/* Testimonials */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
                <div className="bg-slate-100 h-4 w-full rounded animate-pulse" />
                <div className="bg-slate-100 h-4 w-4/5 rounded animate-pulse" />
                <div className="flex items-center gap-3 mt-4">
                  <div className="bg-slate-100 w-10 h-10 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="bg-slate-100 h-3 w-24 rounded animate-pulse" />
                    <div className="bg-slate-100 h-3 w-16 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col"
              >
                <Quote size={28} className="text-green-500/40 mb-4" />
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                  {testimonial.message}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={
                      testimonial.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=e2e8f0&color=475569&bold=true`
                    }
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
