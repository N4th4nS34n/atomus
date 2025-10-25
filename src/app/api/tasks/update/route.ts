import { NextRequest, NextResponse } from "next/server";
import { updateTask } from "@/lib/tasks/update";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const task = await updateTask(data);
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Failed to update task." }, { status: 500 });
  }
}
