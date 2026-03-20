"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IApiResponse, IProduct } from "@/types";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import ProductFormModal from "@/components/shared/ProductFormModal";
import { containerStyle } from "@/constants";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const fetchProducts = async () => {
    try {
      const { data } =
        await axiosInstance.get<IApiResponse<IProduct[]>>("/products");
      if (data.data) setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div
      style={{
        ...containerStyle,
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              letterSpacing: "-0.025em",
              color: "#0f172a",
            }}
          >
            Produk
          </h1>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            Kelola katalog produk D'Kayateen
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            backgroundColor: "#0f172a",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: "500",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <Plus size={16} />
          Tambah Produk
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: "0.75rem",
                height: "4rem",
                border: "1px solid #f1f5f9",
              }}
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            paddingTop: "6rem",
            paddingBottom: "6rem",
            backgroundColor: "white",
            borderRadius: "1rem",
            border: "1px solid #f1f5f9",
          }}
        >
          <Package
            size={40}
            style={{ color: "#e2e8f0", margin: "0 auto 0.75rem" }}
          />
          <p style={{ color: "#64748b" }}>
            Belum ada produk. Tambahkan produk pertama!
          </p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            border: "1px solid #f1f5f9",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {["Produk", "Kategori", "Varian", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: h === "" ? "right" : "left",
                      padding: "0.875rem 1.5rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ borderBottom: "1px solid #f8fafc" }}
                >
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <img
                        src={
                          product.images[0] ||
                          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&q=80"
                        }
                        alt={product.name}
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "0.5rem",
                          objectFit: "cover",
                          backgroundColor: "#f1f5f9",
                        }}
                      />
                      <span
                        style={{
                          fontWeight: "500",
                          color: "#0f172a",
                          fontSize: "0.875rem",
                        }}
                      >
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: "#64748b",
                    }}
                  >
                    {product.category}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: "#64748b",
                    }}
                  >
                    {product.variants.length} varian
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontWeight: "500",
                        backgroundColor: product.isAvailable
                          ? "#f0fdf4"
                          : "#fef2f2",
                        color: product.isAvailable ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {product.isAvailable ? "Tersedia" : "Habis"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "0.25rem",
                      }}
                    >
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        style={{
                          padding: "0.5rem",
                          color: "#94a3b8",
                          backgroundColor: "transparent",
                          border: "none",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        style={{
                          padding: "0.5rem",
                          color: "#94a3b8",
                          backgroundColor: "transparent",
                          border: "none",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}
