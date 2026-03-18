import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { IJwtPayload, IApiResponse } from "../types/index";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      admin?: IJwtPayload;
    }
  }
}

export const protect = (
  req: Request,
  res: Response<IApiResponse<null>>,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Unauthorized — no token provided",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as IJwtPayload;
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Unauthorized — invalid token",
    });
  }
};
