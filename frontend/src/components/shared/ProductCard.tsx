"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import type { IProduct } from "@/types";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/constants";

interface ProductCardProps {
  product: IProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.order(product.name),
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.01, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        <img
          src={
            product.images[0] ||
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
          }
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        {/* Category Badge */}
        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.25rem 0.625rem",
              backgroundColor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              color: "#334155",
              fontWeight: "500",
              borderRadius: "9999px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            {product.category}
          </span>
        </div>
        {/* Unavailable Overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="text-white font-medium text-sm bg-slate-800/80 px-4 py-1.5 rounded-full">
              Stok Habis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem 1.5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontWeight: "600",
            color: "#0f172a",
            fontSize: "1.1rem",
            marginBottom: "0.5rem",
            lineHeight: "1.4",
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            color: "#64748b",
            fontSize: "0.875rem",
            lineHeight: "1.6",
            marginBottom: "1rem",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Variants */}
        {product.variants.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#94a3b8",
                fontWeight: "500",
                marginBottom: "0.5rem",
              }}
            >
              {product.variants.length} Varian Tersedia
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {product.variants.slice(0, 4).map((variant) => (
                <span
                  key={variant.name}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "9999px",
                    border: "1px solid",
                    borderColor: variant.isAvailable ? "#e2e8f0" : "#f1f5f9",
                    backgroundColor: variant.isAvailable
                      ? "#f8fafc"
                      : "#f8fafc",
                    color: variant.isAvailable ? "#475569" : "#cbd5e1",
                    textDecoration: variant.isAvailable
                      ? "none"
                      : "line-through",
                  }}
                >
                  {variant.name}
                </span>
              ))}
              {product.variants.length > 4 && (
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "9999px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#f8fafc",
                    color: "#64748b",
                  }}
                >
                  +{product.variants.length - 4} lagi
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0.75rem 1rem",
            fontSize: "0.875rem",
            fontWeight: "600",
            borderRadius: "0.75rem",
            textDecoration: "none",
            transition: "all 0.2s",
            backgroundColor: product.isAvailable ? "#22c55e" : "#f1f5f9",
            color: product.isAvailable ? "white" : "#94a3b8",
            pointerEvents: product.isAvailable ? "auto" : "none",
            marginTop: "auto",
          }}
        >
          <MessageCircle size={16} />
          {product.isAvailable ? "Pesan Sekarang" : "Tidak Tersedia"}
        </a>
      </div>
    </motion.div>
  );
}
