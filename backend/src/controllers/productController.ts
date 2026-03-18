import type { Request, Response } from "express";
import Product from "../models/Product";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadToCloudinary";
import type { IApiResponse, IProduct } from "../types/index";

// GET all products
export const getProducts = async (
  req: Request,
  res: Response<IApiResponse<IProduct[]>>,
): Promise<void> => {
  const products = await Product.find({ isAvailable: true }).sort({
    createdAt: -1,
  });
  res.json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
};

// GET all products including unavailable (admin)
export const getAllProducts = async (
  req: Request,
  res: Response<IApiResponse<IProduct[]>>,
): Promise<void> => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    message: "All products fetched successfully",
    data: products,
  });
};

// GET single product
export const getProductById = async (
  req: Request,
  res: Response<IApiResponse<IProduct>>,
): Promise<void> => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }
  res.json({
    success: true,
    message: "Product fetched successfully",
    data: product,
  });
};

// POST create product with image upload
export const createProduct = async (
  req: Request,
  res: Response<IApiResponse<IProduct>>,
): Promise<void> => {
  const { name, description, category, variants, isAvailable } = req.body;
  const images: string[] = [];

  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.buffer, "dkayateen/products");
      images.push(url);
    }
  }

  const product = await Product.create({
    name,
    description,
    category,
    variants: variants ? JSON.parse(variants) : [],
    images,
    isAvailable: isAvailable ?? true,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

// PUT update product
export const updateProduct = async (
  req: Request,
  res: Response<IApiResponse<IProduct>>,
): Promise<void> => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

  // Upload gambar baru jika ada
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    // Hapus gambar lama dari Cloudinary
    for (const imageUrl of product.images) {
      await deleteFromCloudinary(imageUrl);
    }
    // Upload gambar baru
    const newImages: string[] = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.buffer, "dkayateen/products");
      newImages.push(url);
    }
    product.images = newImages;
  }

  const { name, description, category, variants, isAvailable } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (category) product.category = category;
  if (variants) product.variants = JSON.parse(variants);
  if (isAvailable !== undefined) product.isAvailable = isAvailable;

  await product.save();

  res.json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

// DELETE product
export const deleteProduct = async (
  req: Request,
  res: Response<IApiResponse<null>>,
): Promise<void> => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

  // Hapus semua gambar dari Cloudinary
  for (const imageUrl of product.images) {
    await deleteFromCloudinary(imageUrl);
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
};
