export async function deleteTask(taskId: string) {
  await fetch('/api/tasks/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId }),
  });
}
