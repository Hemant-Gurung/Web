import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { createError } from "../middleware/errorHandler";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// GET /api/menu — all categories with their items (public)
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      include: {
        items: {
          where: { available: true },
          orderBy: { name: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// POST /api/menu/categories — create a category (admin only)
router.post(
  "/categories",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as { name: string };
      if (!name) return next(createError("Category name is required", 400));

      const category = await prisma.menuCategory.create({ data: { name } });
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/menu/items — create a menu item (admin only)
router.post(
  "/items",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, price, categoryId, available } = req.body as {
        name: string;
        description: string;
        price: number;
        categoryId: number;
        available?: boolean;
      };

      if (!name || !description || price == null || !categoryId) {
        return next(createError("name, description, price, and categoryId are required", 400));
      }

      const item = await prisma.menuItem.create({
        data: { name, description, price, categoryId, available: available ?? true },
        include: { category: true },
      });
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /api/menu/items/:id — update a menu item (admin only)
router.patch(
  "/items/:id",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { name, description, price, available } = req.body as Partial<{
        name: string;
        description: string;
        price: number;
        available: boolean;
      }>;

      const item = await prisma.menuItem.update({
        where: { id },
        data: { name, description, price, available },
        include: { category: true },
      });
      res.json(item);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/menu/items/:id — delete a menu item (admin only)
router.delete(
  "/items/:id",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await prisma.menuItem.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
