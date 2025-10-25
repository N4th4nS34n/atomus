import { prisma } from "../prisma";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(name: string, email: string, passwordHash: string) {
  return prisma.user.create({ data: { name, email, passwordHash } });
}
