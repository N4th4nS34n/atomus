import { prisma } from "../prisma";
import type { Urgency, Priority } from "@prisma/client";

export async function createTask(data: {
  title: string;
  description?: string;
  urgency: Urgency;
  priority: Priority;
  userId: string;
}) {
  if (!data.title || !data.urgency || !data.priority || !data.userId) {
    throw new Error("Missing required fields.");
  }
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      urgency: data.urgency,
      priority: data.priority,
      createdById: data.userId,
    },
  });
}
