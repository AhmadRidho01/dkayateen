"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axios";
import type { IProduct, IApiResponse } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import {
  containerStyle,
  sectionStyle,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGES,
} from "@/constants";

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
    <section
      style={{
        paddingTop: "3.5rem",
        paddingBottom: "5rem",
        backgroundColor: "white",
      }}
    >
      <div style={containerStyle}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "1rem",
            gap: "1.5rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                color: "#16a34a",
                fontWeight: "500",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                marginBottom: "0.1rem",
              }}
            >
              Pilihan Terbaik
            </p>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                letterSpacing: "-0.025em",
                color: "#0f172a",
              }}
            >
              Produk Unggulan
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#475569",
                textDecoration: "none",
              }}
            >
              Lihat Semua
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "1rem",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f1f5f9",
                    height: "14rem",
                    animation: "pulse 2s infinite",
                  }}
                />
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
        ) : products.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              paddingTop: "4rem",
              paddingBottom: "4rem",
            }}
          >
            Produk belum tersedia.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
