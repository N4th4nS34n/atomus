import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Urgency, Priority, TaskStatus } from "@prisma/client";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = await params;

  const url = new URL(req.url);
  const urgency = url.searchParams.get("urgency") as Urgency | null;
  const priority = url.searchParams.get("priority") as Priority | null;
  const status = url.searchParams.get("status") as TaskStatus | null;
  const sortBy = url.searchParams.get("sortBy") as "createdAt" | "urgency" | "priority" | "status" | null;
  const sortOrder = url.searchParams.get("sortOrder") as "asc" | "desc" | null;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        createdById: userId,
        ...(urgency ? { urgency } : {}),
        ...(priority ? { priority } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: sortBy
        ? { [sortBy]: sortOrder || "asc" }
        : { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks." }, { status: 500 });
  }
}
