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
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-green-600 font-medium tracking-widest uppercase text-sm mb-2">
              Katalog
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Semua Produk
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-slate-400 text-lg">Produk tidak ditemukan.</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
