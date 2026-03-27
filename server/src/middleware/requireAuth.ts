import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createError } from "./errorHandler";

export interface AuthRequest extends Request {
  admin?: { id: number; email: string };
}

export const requireAuth = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(createError("Unauthorised — no token provided", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };
    req.admin = decoded;
    next();
  } catch {
    next(createError("Unauthorised — invalid or expired token", 401));
  }
};
