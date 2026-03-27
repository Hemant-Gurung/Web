import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma instances in development (hot reload)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = prisma as any;
