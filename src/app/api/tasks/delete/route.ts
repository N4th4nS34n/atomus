import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  const { taskId } = await req.json();

  if (!taskId) {
    return NextResponse.json({ error: 'Task ID is required.' }, { status: 400 });
  }

  try {
    await prisma.task.delete({ where: { id: taskId } });
    return NextResponse.json({ message: 'Task deleted successfully.' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete task.' }, { status: 500 });
  }
}
