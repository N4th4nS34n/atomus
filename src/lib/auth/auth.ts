import bcrypt from "bcrypt";
import { findUserByEmail } from "./user";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function authorizeUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) return null;
  return { id: user.id, name: user.name, email: user.email };
}
