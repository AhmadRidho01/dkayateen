"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import type { IApiResponse, ILoginForm } from "@/types";
import { SITE_NAME } from "@/constants";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [form, setForm] = useState<ILoginForm>({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.post<
        IApiResponse<{ token: string }>
      >("/auth/login", form);
      if (data.data?.token) {
        login(data.data.token);
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "24rem" }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1.25rem",
            border: "1px solid #f1f5f9",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            padding: "2.5rem",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#0f172a",
                borderRadius: "0.875rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <Lock size={20} style={{ color: "white" }} />
            </div>
            <h1
              style={{
                fontSize: "1.375rem",
                fontWeight: "700",
                color: "#0f172a",
                letterSpacing: "-0.025em",
              }}
            >
              Admin {SITE_NAME}
            </h1>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.875rem",
                marginTop: "0.375rem",
              }}
            >
              Masuk untuk mengelola konten website
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Masukkan username"
                required
                style={{
                  width: "100%",
                  padding: "0.625rem 1rem",
                  borderRadius: "0.625rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  color: "#0f172a",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Masukkan password"
                  required
                  style={{
                    width: "100%",
                    padding: "0.625rem 2.5rem 0.625rem 1rem",
                    borderRadius: "0.625rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: "#dc2626",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                  padding: "0.625rem 0.875rem",
                  backgroundColor: "#fef2f2",
                  borderRadius: "0.5rem",
                }}
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: loading ? "#94a3b8" : "#0f172a",
                color: "white",
                fontWeight: "600",
                fontSize: "0.875rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
