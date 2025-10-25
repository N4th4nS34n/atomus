import { NextRequest, NextResponse } from "next/server";
import { createTask } from "@/lib/tasks/create";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const task = await createTask(data);
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task." }, { status: 500 });
  }
}
