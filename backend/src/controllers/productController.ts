import type { Request, Response } from "express";
import Product from "../models/Product";
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

// POST create product
export const createProduct = async (
  req: Request,
  res: Response<IApiResponse<IProduct>>,
): Promise<void> => {
  const product = await Product.create(req.body);
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
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }
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
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }
  res.json({
    success: true,
    message: "Product deleted successfully",
  });
};
