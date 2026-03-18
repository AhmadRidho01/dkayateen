"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import type { IProduct, IApiResponse } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

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
