"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IProduct, IApiResponse } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import { containerStyle } from "@/constants";

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
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Page Header */}
      <div
        style={{ backgroundColor: "white", borderBottom: "1px solid #f1f5f9" }}
      >
        <div
          style={{
            ...containerStyle,
            paddingTop: "7rem",
            paddingBottom: "2rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                color: "#16a34a",
                fontWeight: "500",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              Katalog
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "700",
                  letterSpacing: "-0.025em",
                  color: "#0f172a",
                }}
              >
                Semua Produk
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                {loading ? "..." : `${filtered.length} produk ditemukan`}
              </p>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                style={{
                  padding: "0.375rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor:
                    activeCategory === category ? "#0f172a" : "#f1f5f9",
                  color: activeCategory === category ? "white" : "#475569",
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        style={{ ...containerStyle, paddingTop: "3rem", paddingBottom: "4rem" }}
      >
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <div style={{ backgroundColor: "#f1f5f9", height: "14rem" }} />
                <div
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#f1f5f9",
                      height: "0.75rem",
                      width: "33%",
                      borderRadius: "0.25rem",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#f1f5f9",
                      height: "1.25rem",
                      width: "66%",
                      borderRadius: "0.25rem",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#f1f5f9",
                      height: "2.5rem",
                      width: "100%",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              paddingTop: "6rem",
              paddingBottom: "6rem",
            }}
          >
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥡</p>
            <p style={{ color: "#475569", fontWeight: "500" }}>
              Produk tidak ditemukan
            </p>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
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
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
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
