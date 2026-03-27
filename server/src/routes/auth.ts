import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../lib/prisma";
import { createError } from "../middleware/errorHandler";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

// POST /api/auth/register — create the first admin account
// Disable this endpoint once your admin account is created
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        return next(createError("Email and password are required", 400));
      }

      if (password.length < 8) {
        return next(createError("Password must be at least 8 characters", 400));
      }

      const existing = await db.admin.findUnique({ where: { email } });
      if (existing) {
        return next(createError("An admin with this email already exists", 409));
      }

      const hashed = await bcrypt.hash(password, 12);
      const admin = await db.admin.create({
        data: { email, password: hashed },
        select: { id: true, email: true, createdAt: true },
      });

      res.status(201).json(admin);
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/auth/login — returns a JWT
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        return next(createError("Email and password are required", 400));
      }

      const admin = await db.admin.findUnique({ where: { email } });
      if (!admin) {
        return next(createError("Invalid email or password", 401));
      }

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        return next(createError("Invalid email or password", 401));
      }

      const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
      });

      res.json({ token, admin: { id: admin.id, email: admin.email } });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/auth/me — verify token and return current admin
router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return next(createError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };

    const admin = await db.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, createdAt: true },
    });

    if (!admin) return next(createError("Admin not found", 404));

    res.json(admin);
  } catch (err) {
    next(err);
  }
});

export default router;
