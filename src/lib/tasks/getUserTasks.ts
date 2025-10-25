import { prisma } from "../prisma";
import type { Urgency, Priority, TaskStatus } from "@prisma/client";

export async function getUserTasks(params: {
  userId: string;
  urgency?: Urgency | null;
  priority?: Priority | null;
  status?: TaskStatus | null;
  sortBy?: "createdAt" | "urgency" | "priority" | "status" | null;
  sortOrder?: "asc" | "desc" | null;
}) {
  return prisma.task.findMany({
    where: {
      createdById: params.userId,
      ...(params.urgency && { urgency: params.urgency }),
      ...(params.priority && { priority: params.priority }),
      ...(params.status && { status: params.status }),
    },
    orderBy: { [params.sortBy || "createdAt"]: params.sortOrder || (params.sortBy ? "asc" : "desc") },
  });
}
