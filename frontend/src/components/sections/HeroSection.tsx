"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGES,
  containerStyle,
} from "@/constants";

export default function HeroSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.general,
  )}`;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1593840835024-4ccbf5b171d7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.6) 50%, rgba(30,41,59,0.4) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "25%",
          width: "24rem",
          height: "24rem",
          backgroundColor: "rgba(34,197,94,0.08)",
          borderRadius: "9999px",
          filter: "blur(64px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "25%",
          width: "16rem",
          height: "16rem",
          backgroundColor: "rgba(16,185,129,0.08)",
          borderRadius: "9999px",
          filter: "blur(64px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          ...containerStyle,
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "48rem" }}>
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "800",
              letterSpacing: "-0.025em",
              color: "white",
              marginBottom: "1.5rem",
              lineHeight: "1.1",
            }}
          >
            Cita Rasa
            <span style={{ display: "block", color: "#4ade80" }}>Autentik</span>
            D'Kayateen
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              color: "#cbd5e1",
              fontSize: "1.125rem",
              maxWidth: "36rem",
              marginBottom: "2.5rem",
              lineHeight: "1.75",
            }}
          >
            Kerupuk ikan, rambak cumi, rajungan, kelor, rengginang, dan kacang
            sangrai. Dibuat dengan bahan pilihan, cita rasa terjamin.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                backgroundColor: "#22c55e",
                color: "white",
                fontWeight: "600",
                borderRadius: "0.75rem",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#16a34a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#22c55e")
              }
            >
              Lihat Produk
              <ArrowRight size={18} />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                fontWeight: "600",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={18} />
              Hubungi Kami
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              { value: "6+", label: "Varian Produk" },
              { value: "100%", label: "Bahan Pilihan" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            width: "1px",
            height: "2rem",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
