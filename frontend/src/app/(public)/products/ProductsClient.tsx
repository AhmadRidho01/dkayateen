"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IProduct, IApiResponse } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

const CATEGORIES = ["Semua", "Kerupuk", "Rajungan", "Rengginang", "Kacang"];

export default function ProductsClient() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } =
          await axiosInstance.get<IApiResponse<IProduct[]>>("/products");
        if (data.data) {
          setProducts(data.data);
          setFiltered(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "Semua") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-navbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-green-600 font-medium tracking-widest uppercase text-xs mb-2">
              Katalog
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Semua Produk
              </h1>
              <p className="text-slate-400 text-sm">
                {loading ? "..." : `${filtered.length} produk ditemukan`}
              </p>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white">
                <div className="bg-slate-100 h-56 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="bg-slate-100 h-3 w-1/4 rounded animate-pulse" />
                  <div className="bg-slate-100 h-5 w-2/3 rounded animate-pulse" />
                  <div className="bg-slate-100 h-4 w-full rounded animate-pulse" />
                  <div className="bg-slate-100 h-4 w-4/5 rounded animate-pulse" />
                  <div className="bg-slate-100 h-10 w-full rounded-lg animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-slate-300 text-6xl mb-4">🥡</p>
            <p className="text-slate-500 font-medium">Produk tidak ditemukan</p>
            <p className="text-slate-400 text-sm mt-1">
              Coba pilih kategori lain
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
