import { NextRequest, NextResponse } from "next/server";
import { getUserTasks } from "@/lib/tasks/getUserTasks";
import { Priority, TaskStatus, Urgency } from "@prisma/client";

export async function GET(req: NextRequest, context: { params: { userId: string } }) {
  try {
    const params = await context.params;

    const url = new URL(req.url);
    const tasks = await getUserTasks({
      userId: params.userId,
      urgency: url.searchParams.get("urgency") as Urgency,
      priority: url.searchParams.get("priority") as Priority,
      status: url.searchParams.get("status") as TaskStatus,
      sortBy: url.searchParams.get("sortBy") as any,
      sortOrder: url.searchParams.get("sortOrder") as any,
    });

    return NextResponse.json(tasks);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch tasks." }, { status: 500 });
  }
}
