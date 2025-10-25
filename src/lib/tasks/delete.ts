import { prisma } from "../prisma";

export async function deleteTask(taskId?: string) {
  if (!taskId) throw new Error("Task ID is required.");
  return prisma.task.delete({ where: { id: taskId } });
}
