import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const backupPrisma = process.env.BACKUP_DATABASE_URL
  ? new PrismaClient({
      datasources: { db: { url: process.env.BACKUP_DATABASE_URL } },
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
  : null;

export async function saveRegistrationBackup(data: Prisma.RegistrationCreateInput) {
  if (!backupPrisma) return false;

  try {
    await backupPrisma.registration.create({ data });
    return true;
  } catch (error) {
    console.error("Registration backup database error:", error);
    return false;
  }
}
