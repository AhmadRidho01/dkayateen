import Link from "next/link";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { SITE_NAME, WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/constants";

export default function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.general,
  )}`;

  return (
    <footer className="bg-slate-900">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-xl mb-3">{SITE_NAME}</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Produk olahan laut dan camilan berkualitas tinggi, dibuat dengan
              bahan pilihan langsung dari pengrajin lokal terpercaya.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Beranda" },
                { href: "/products", label: "Produk" },
                { href: "/#testimonials", label: "Testimoni" },
                { href: "/#contact", label: "Kontak" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Produk</h4>
            <ul className="space-y-3">
              {[
                "Kerupuk Ikan",
                "Kerupuk Rambak Cumi",
                "Rajungan",
                "Kerupuk Kelor",
                "Rengginang",
                "Kacang Sangrai",
              ].map((product) => (
                <li key={product}>
                  <Link
                    href="/products"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <MessageCircle size={14} />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
