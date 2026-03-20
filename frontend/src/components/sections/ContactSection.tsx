"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGES,
  SITE_NAME,
  containerStyle,
} from "@/constants";

export default function ContactSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.general,
  )}`;

  return (
    <section
      id="contact"
      style={{
        paddingTop: "4rem",
        paddingBottom: "7rem",
        backgroundColor: "white",
      }}
    >
      <div style={containerStyle}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            position: "relative",
            backgroundColor: "#0f172a",
            borderRadius: "1.5rem",
            padding: "2rem",
            overflow: "hidden",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Decorative */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "24rem",
              height: "24rem",
              backgroundColor: "rgba(34,197,94,0.08)",
              borderRadius: "9999px",
              filter: "blur(64px)",
              transform: "translate(50%, -50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "16rem",
              height: "16rem",
              backgroundColor: "rgba(16,185,129,0.08)",
              borderRadius: "9999px",
              filter: "blur(64px)",
              transform: "translate(-50%, 50%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "36rem",
              width: "100%",
            }}
          >
            <p
              style={{
                color: "#4ade80",
                fontWeight: "500",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              Hubungi Kami
            </p>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                letterSpacing: "-0.025em",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Tertarik dengan produk {SITE_NAME}?
            </h2>
            <p
              style={{
                color: "#94a3b8",
                marginBottom: "2.5rem",
                lineHeight: "1.75",
              }}
            >
              Hubungi kami langsung melalui WhatsApp untuk informasi produk,
              pemesanan, atau kerjasama sebagai reseller. Kami siap melayani
              Anda.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1rem 2.5rem",
                backgroundColor: "#22c55e",
                color: "white",
                fontWeight: "600",
                borderRadius: "0.75rem",
                textDecoration: "none",
                fontSize: "1rem",
                transition: "all 0.2s",
              }}
            >
              <MessageCircle size={20} />
              Chat WhatsApp Sekarang
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
