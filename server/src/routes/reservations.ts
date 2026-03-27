import { Router, Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { createError } from "../middleware/errorHandler";
import { requireAuth } from "../middleware/requireAuth";

// Mirrors the Prisma-generated enum — keep in sync with schema.prisma
const ReservationStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;
type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus];

const router = Router();

// POST /api/reservations — book a table (public)
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, date, partySize, notes } = req.body as {
      name: string;
      email: string;
      phone: string;
      date: string;
      partySize: number;
      notes?: string;
    };

    if (!name || !email || !phone || !date || !partySize) {
      return next(createError("name, email, phone, date, and partySize are required", 400));
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return next(createError("Invalid date format", 400));
    }

    if (parsedDate < new Date()) {
      return next(createError("Reservation date must be in the future", 400));
    }

    const reservation = await prisma.reservation.create({
      data: { name, email, phone, date: parsedDate, partySize, notes },
    });

    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
});

// GET /api/reservations — list all reservations (admin only)
router.get("/", requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, date } = req.query as {
      status?: ReservationStatus;
      date?: string;
    };

    const reservations = await prisma.reservation.findMany({
      where: {
        ...(status && { status }),
        ...(date && {
          date: {
            gte: new Date(date),
            lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
          },
        }),
      },
      orderBy: { date: "asc" },
    });

    res.json(reservations);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/reservations/:id/status — confirm or cancel (admin only)
router.patch(
  "/:id/status",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body as { status: ReservationStatus };

      if (!Object.values(ReservationStatus).includes(status)) {
        return next(createError(`Status must be one of: ${Object.values(ReservationStatus).join(", ")}`, 400));
      }

      const reservation = await prisma.reservation.update({
        where: { id },
        data: { status },
      });

      res.json(reservation);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
