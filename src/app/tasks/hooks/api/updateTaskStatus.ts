import { Task } from '../../types/task';

export async function updateTaskStatus(taskId: string, status: Task['status']) {
  await fetch('/api/tasks/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, status }),
  });
}
