"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "@/lib/axios";
import type { ITestimonial, IApiResponse } from "@/types";
import { containerStyle } from "@/constants";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (!loading && testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      style={{
        paddingTop: "4rem",
        paddingBottom: "4rem",
        backgroundColor: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <div style={containerStyle}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p
            style={{
              color: "#16a34a",
              fontWeight: "500",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            Kata Mereka
          </p>
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "700",
              letterSpacing: "-0.025em",
              color: "#0f172a",
            }}
          >
            Testimoni Pelanggan
          </h2>
          <p
            style={{
              color: "#64748b",
              marginTop: "0.75rem",
              textAlign: "center",
            }}
          >
            Kepuasan pelanggan adalah prioritas utama kami
          </p>
        </motion.div>

        {/* Slider */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  height: "12rem",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      style={{ color: "#f59e0b", fill: "#f59e0b" }}
                    />
                  ))}
                </div>

                <p
                  style={{
                    color: "#475569",
                    fontSize: "0.875rem",
                    lineHeight: "1.75",
                    flex: 1,
                    marginBottom: "1.5rem",
                  }}
                >
                  {testimonial.message}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <img
                    src={
                      testimonial.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=e2e8f0&color=475569&bold=true`
                    }
                    alt={testimonial.name}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "9999px",
                      objectFit: "cover",
                      border: "2px solid #f1f5f9",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#0f172a",
                        fontSize: "0.875rem",
                      }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.75rem",
                        marginTop: "0.125rem",
                      }}
                    >
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
