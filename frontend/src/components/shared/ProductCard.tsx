"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
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
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        <img
          src={
            product.images[0] ||
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"
          }
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Availability Badge */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="text-white font-medium text-sm bg-slate-800 px-3 py-1 rounded-full">
              Stok Habis
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs text-green-600 font-medium uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-slate-900 text-lg mb-2">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Variants */}
        {product.variants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-slate-400 mb-2">Varian tersedia:</p>
            <div className="flex flex-wrap gap-1">
              {product.variants.slice(0, 4).map((variant) => (
                <span
                  key={variant.name}
                  className={`text-xs px-2 py-1 rounded-full ${
                    variant.isAvailable
                      ? "bg-slate-100 text-slate-600"
                      : "bg-slate-50 text-slate-300 line-through"
                  }`}
                >
                  {variant.name}
                </span>
              ))}
              {product.variants.length > 4 && (
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded-full">
                  +{product.variants.length - 4} lagi
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
            product.isAvailable
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          <MessageCircle size={16} />
          {product.isAvailable ? "Pesan Sekarang" : "Tidak Tersedia"}
        </a>
      </div>
    </motion.div>
  );
}
