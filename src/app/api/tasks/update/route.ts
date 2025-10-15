import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
  try {
    const { taskId, title, description, urgency, priority, status } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required.' },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        urgency,
        priority,
        status,
        inProgressAt: status === 'InProgress' ? new Date() : undefined,
        finishedAt: status === 'Finished' ? new Date() : undefined,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update task.' },
      { status: 500 }
    );
  }
}
