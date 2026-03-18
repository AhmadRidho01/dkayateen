import type { Document, Types } from "mongoose";

// Product
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  variants: IVariant[];
  images: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVariant {
  name: string;
  isAvailable: boolean;
}

// Testimonial
export interface ITestimonial extends Document {
  _id: Types.ObjectId;
  name: string;
  role: string;
  message: string;
  avatar: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Admin
export interface IAdmin extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// JWT Payload
export interface IJwtPayload {
  id: string;
  username: string;
}

// API Response
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
