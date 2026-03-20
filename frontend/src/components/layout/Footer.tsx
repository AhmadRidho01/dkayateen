import Link from "next/link";
import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { SITE_NAME, WHATSAPP_NUMBER, WHATSAPP_MESSAGES } from "@/constants";
import { containerStyle } from "@/constants";

export default function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGES.general,
  )}`;

  return (
    <footer style={{ backgroundColor: "#0f172a" }}>
      <div
        style={{ ...containerStyle, paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <h3
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: "1.25rem",
                marginBottom: ".5rem",
              }}
            >
              {SITE_NAME}
            </h3>
            <p
              style={{
                color: "#64748b",
                fontSize: "0.875rem",
                lineHeight: "1.75",
                maxWidth: "25rem",
              }}
            >
              Produk olahan laut dan camilan berkualitas tinggi, dibuat dengan
              bahan pilihan langsung dari pengrajin lokal terpercaya.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: MessageCircle, href: waLink },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748b",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: ".5rem",
              }}
            >
              Navigasi
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
              {[
                { href: "/", label: "Beranda" },
                { href: "/products", label: "Produk" },
                { href: "/#testimonials", label: "Testimoni" },
                { href: "/#contact", label: "Kontak" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "0.875rem",
                marginBottom: ".5rem",
              }}
            >
              Produk
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
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
                    style={{
                      color: "#64748b",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                    }}
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
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: "1.5rem",
            paddingBottom: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "#64748b", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.75rem",
              color: "#64748b",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={14} />
            Hubungi via WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
