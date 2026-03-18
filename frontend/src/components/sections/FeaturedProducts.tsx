"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import type { IProduct, IApiResponse } from "@/types";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/constants";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } =
          await axiosInstance.get<IApiResponse<IProduct[]>>("/products");
        if (data.data) setProducts(data.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-medium tracking-widest uppercase text-sm mb-2">
            Pilihan Terbaik
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Produk Unggulan
          </h2>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-100 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-slate-500">Produk belum tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="px-8 py-3 border border-slate-300 hover:border-slate-400 text-slate-700 font-medium rounded-lg transition-colors duration-200"
          >
            Lihat Semua Produk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: IProduct; index: number }) {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.order(product.name),
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
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
          <div className="flex flex-wrap gap-1 mb-4">
            {product.variants.slice(0, 3).map((variant) => (
              <span
                key={variant.name}
                className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
              >
                {variant.name}
              </span>
            ))}
            {product.variants.length > 3 && (
              <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                +{product.variants.length - 3} lagi
              </span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          Pesan Sekarang
        </a>
      </div>
    </motion.div>
  );
}
