import type { Request, Response, NextFunction } from "express";
import type { IApiResponse } from "../types/index";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<IApiResponse<null>>,
  next: NextFunction,
): void => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
