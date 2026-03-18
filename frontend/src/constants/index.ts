export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const WHATSAPP_NUMBER = "62812574972345"; // nomor WA D'Kayateen

export const WHATSAPP_MESSAGES = {
  general: "Halo D'Kayateen, saya ingin bertanya mengenai produk Anda.",
  order: (productName: string) =>
    `Halo D\'Kayateen, saya ingin memesan *${productName}*. Mohon informasinya lebih lanjut.`,
};

export const SITE_NAME = "D'Kayateen";
export const SITE_DESCRIPTION =
  "Produk olahan laut dan camilan berkualitas dari D'Kayateen";
