"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import type { IProduct } from "@/types";
import { X, Plus, Trash2 } from "lucide-react";

interface ProductFormModalProps {
  product: IProduct | null;
  onClose: () => void;
}

interface VariantInput {
  name: string;
  isAvailable: boolean;
}

export default function ProductFormModal({
  product,
  onClose,
}: ProductFormModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    isAvailable: true,
  });
  const [variants, setVariants] = useState<VariantInput[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        category: product.category,
        isAvailable: product.isAvailable,
      });
      setVariants(product.variants);
    }
  }, [product]);

  const handleAddVariant = () => {
    setVariants([...variants, { name: "", isAvailable: true }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: keyof VariantInput,
    value: string | boolean,
  ) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("isAvailable", String(form.isAvailable));
      formData.append("variants", JSON.stringify(variants));

      images.forEach((image) => {
        formData.append("images", image);
      });

      if (product) {
        await axiosInstance.put(`/products/${product._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onClose();
    } catch {
      setError("Gagal menyimpan produk. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">
              {product ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nama Produk
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm"
                placeholder="Contoh: Kerupuk Ikan"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Deskripsi
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm resize-none"
                placeholder="Deskripsi singkat produk"
                rows={3}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Kategori
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm bg-white"
                required
              >
                <option value="">Pilih kategori</option>
                <option value="Kerupuk">Kerupuk</option>
                <option value="Rajungan">Rajungan</option>
                <option value="Rengginang">Rengginang</option>
                <option value="Kacang">Kacang</option>
              </select>
            </div>

            {/* Variants */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Varian
                </label>
                <button
                  type="button"
                  onClick={handleAddVariant}
                  className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
                >
                  <Plus size={12} />
                  Tambah Varian
                </button>
              </div>
              <div className="space-y-2">
                {variants.map((variant, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) =>
                        handleVariantChange(index, "name", e.target.value)
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none text-sm"
                      placeholder="Nama varian"
                    />
                    <label className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={variant.isAvailable}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "isAvailable",
                            e.target.checked,
                          )
                        }
                        className="rounded"
                      />
                      Tersedia
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Foto Produk
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files || []))}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200"
              />
              {product?.images && product.images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="existing"
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAvailable"
                checked={form.isAvailable}
                onChange={(e) =>
                  setForm({ ...form, isAvailable: e.target.checked })
                }
                className="rounded"
              />
              <label
                htmlFor="isAvailable"
                className="text-sm font-medium text-slate-700"
              >
                Produk tersedia
              </label>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
