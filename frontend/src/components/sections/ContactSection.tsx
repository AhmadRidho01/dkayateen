"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES, SITE_NAME } from "@/constants";

export default function ContactSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.general,
  )}`;

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-slate-900 rounded-3xl p-12 sm:p-16 overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <p className="text-green-400 font-medium tracking-widest uppercase text-xs mb-4">
              Hubungi Kami
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Tertarik dengan produk {SITE_NAME}?
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Hubungi kami langsung melalui WhatsApp untuk informasi produk,
              pemesanan, atau kerjasama sebagai reseller. Kami siap melayani
              Anda.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20 group"
            >
              <MessageCircle size={20} />
              Chat WhatsApp Sekarang
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
