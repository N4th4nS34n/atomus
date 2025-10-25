import { NextRequest, NextResponse } from "next/server";
import { deleteTask } from "@/lib/tasks/delete";

export async function DELETE(req: NextRequest) {
  try {
    const { taskId } = await req.json();
    await deleteTask(taskId);
    return NextResponse.json({ message: "Task deleted successfully." });
  } catch {
    return NextResponse.json({ error: "Failed to delete task." }, { status: 500 });
  }
}
