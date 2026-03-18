import type { Request, Response } from "express";
import Testimonial from "../models/Testimonial";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadToCloudinary";
import type { IApiResponse, ITestimonial } from "../types/index";

// GET all visible testimonials (public)
export const getTestimonials = async (
  req: Request,
  res: Response<IApiResponse<ITestimonial[]>>,
): Promise<void> => {
  const testimonials = await Testimonial.find({ isVisible: true }).sort({
    createdAt: -1,
  });
  res.json({
    success: true,
    message: "Testimonials fetched successfully",
    data: testimonials,
  });
};

// GET all testimonials (admin)
export const getAllTestimonials = async (
  req: Request,
  res: Response<IApiResponse<ITestimonial[]>>,
): Promise<void> => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json({
    success: true,
    message: "All testimonials fetched successfully",
    data: testimonials,
  });
};

// POST create testimonial (admin)
export const createTestimonial = async (
  req: Request,
  res: Response<IApiResponse<ITestimonial>>,
): Promise<void> => {
  const { name, role, message, isVisible } = req.body;
  let avatarUrl = "";

  if (req.file) {
    avatarUrl = await uploadToCloudinary(req.file.buffer, "dkayateen/avatars");
  }

  const testimonial = await Testimonial.create({
    name,
    role,
    message,
    avatar: avatarUrl,
    isVisible: isVisible ?? true,
  });

  res.status(201).json({
    success: true,
    message: "Testimonial created successfully",
    data: testimonial,
  });
};

// PUT update testimonial (admin)
export const updateTestimonial = async (
  req: Request,
  res: Response<IApiResponse<ITestimonial>>,
): Promise<void> => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404).json({
      success: false,
      message: "Testimonial not found",
    });
    return;
  }

  // Upload avatar baru jika ada
  if (req.file) {
    if (testimonial.avatar) {
      await deleteFromCloudinary(testimonial.avatar);
    }
    testimonial.avatar = await uploadToCloudinary(
      req.file.buffer,
      "dkayateen/avatars",
    );
  }

  const { name, role, message, isVisible } = req.body;
  if (name) testimonial.name = name;
  if (role) testimonial.role = role;
  if (message) testimonial.message = message;
  if (isVisible !== undefined) testimonial.isVisible = isVisible;

  await testimonial.save();

  res.json({
    success: true,
    message: "Testimonial updated successfully",
    data: testimonial,
  });
};

// DELETE testimonial (admin)
export const deleteTestimonial = async (
  req: Request,
  res: Response<IApiResponse<null>>,
): Promise<void> => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404).json({
      success: false,
      message: "Testimonial not found",
    });
    return;
  }

  if (testimonial.avatar) {
    await deleteFromCloudinary(testimonial.avatar);
  }

  await testimonial.deleteOne();

  res.json({
    success: true,
    message: "Testimonial deleted successfully",
  });
};
