"use client";

import { motion } from "framer-motion";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/constants";
import Link from "next/link";

export default function HeroSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES.general)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-400 font-medium tracking-widest uppercase text-sm mb-4"
        >
          Produk Olahan Laut & Camilan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Cita Rasa Autentik <br />
          <span className="text-green-400">D'Kayateen</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-lg max-w-2xl mx-auto mb-8"
        >
          Kerupuk ikan, rambak cumi, rajungan, kelor, rengginang, dan kacang
          sangrai. Dibuat dengan bahan pilihan, cita rasa terjamin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/products"
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Lihat Produk
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition-colors duration-200"
          >
            Hubungi Kami
          </a>
        </motion.div>
      </div>
    </section>
  );
}
