import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { createError } from "../middleware/errorHandler";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// POST /api/contact — save a message (public)
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return next(createError("name, email, and message are required", 400));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(createError("Invalid email address", 400));
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, message },
    });

    // TODO: send notification email via Resend when configured
    // await sendContactEmail({ name, email, message });

    res.status(201).json({ success: true, id: contact.id });
  } catch (err) {
    next(err);
  }
});

// GET /api/contact — list all messages (admin only)
router.get("/", requireAuth, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

export default router;
