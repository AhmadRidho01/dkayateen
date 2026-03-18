import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { SITE_NAME } from "@/constants";

export const metadata: Metadata = {
  title: `Produk — ${SITE_NAME}`,
  description: "Katalog lengkap produk D'Kayateen",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
