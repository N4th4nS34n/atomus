import { Task } from '../../types/task';

export async function createTask(task: Omit<Task, 'id' | 'status'>) {
  if (!task.title) return;

  await fetch('/api/tasks/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
}
