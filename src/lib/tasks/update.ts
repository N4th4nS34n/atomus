import { prisma } from "../prisma";
import type { Urgency, Priority, TaskStatus } from "@prisma/client";

export async function updateTask(data: {
  taskId: string;
  title?: string;
  description?: string;
  urgency?: Urgency;
  priority?: Priority;
  status?: TaskStatus;
}) {
  if (!data.taskId) throw new Error("Task ID is required.");
  return prisma.task.update({
    where: { id: data.taskId },
    data: {
      title: data.title,
      description: data.description,
      urgency: data.urgency,
      priority: data.priority,
      status: data.status,
      inProgressAt: data.status === "InProgress" ? new Date() : undefined,
      finishedAt: data.status === "Finished" ? new Date() : undefined,
    },
  });
}
