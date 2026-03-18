"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGES, SITE_NAME } from "@/constants";

export default function ContactSection() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES.general)}`;

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-12 text-center"
        >
          <p className="text-green-400 font-medium tracking-widest uppercase text-sm mb-4">
            Hubungi Kami
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Tertarik dengan produk {SITE_NAME}?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Hubungi kami langsung melalui WhatsApp untuk informasi produk,
            pemesanan, atau kerjasama sebagai reseller.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <MessageCircle size={20} />
            Chat WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
