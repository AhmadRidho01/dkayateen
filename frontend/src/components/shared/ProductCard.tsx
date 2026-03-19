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
        <div className="absolute top-3 left-3">
          <span className="text-xs px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 font-medium rounded-full shadow-sm">
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
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900 text-lg mb-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Variants */}
        {product.variants.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-slate-400 font-medium mb-2">
              {product.variants.length} Varian Tersedia
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.slice(0, 4).map((variant) => (
                <span
                  key={variant.name}
                  className={`text-xs px-2.5 py-1 rounded-full border ${
                    variant.isAvailable
                      ? "bg-slate-50 border-slate-200 text-slate-600"
                      : "bg-slate-50 border-slate-100 text-slate-300 line-through"
                  }`}
                >
                  {variant.name}
                </span>
              ))}
              {product.variants.length > 4 && (
                <span className="text-xs px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-500 rounded-full">
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
          className={`flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
            product.isAvailable
              ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-md hover:shadow-green-500/20"
              : "bg-slate-100 text-slate-300 cursor-not-allowed pointer-events-none"
          }`}
        >
          {product.isAvailable ? (
            <>
              <MessageCircle size={16} />
              Pesan Sekarang
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              Tidak Tersedia
            </>
          )}
        </a>
      </div>
    </motion.div>
  );
}
