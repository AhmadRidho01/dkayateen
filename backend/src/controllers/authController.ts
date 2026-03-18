import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import type { IApiResponse, IJwtPayload } from "../types/index";

// POST /api/auth/login
export const login = async (
  req: Request,
  res: Response<IApiResponse<{ token: string }>>,
): Promise<void> => {
  const { username, password } = req.body;

  // Validasi input
  if (!username || !password) {
    res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
    return;
  }

  // Cari admin
  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
    return;
  }

  // Verifikasi password
  const bcrypt = await import("bcrypt");
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
    return;
  }

  // Generate JWT
  const payload: IJwtPayload = {
    id: admin._id.toString(),
    username: admin.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.json({
    success: true,
    message: "Login successful",
    data: { token },
  });
};
