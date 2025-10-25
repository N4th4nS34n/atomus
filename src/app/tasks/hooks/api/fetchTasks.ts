import { Task } from '../../types/task';

type FetchTasksParams = {
  userId: string;
  filterUrgency?: string;
  filterPriority?: string;
  filterStatus?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export async function fetchTasks({
  userId,
  filterUrgency,
  filterPriority,
  filterStatus,
  sortBy,
  sortOrder,
}: FetchTasksParams): Promise<Task[]> {
  if (!userId) return [];

  const query = new URLSearchParams();
  if (filterUrgency) query.append('urgency', filterUrgency);
  if (filterPriority) query.append('priority', filterPriority);
  if (filterStatus) query.append('status', filterStatus);
  if (sortBy) query.append('sortBy', sortBy);
  if (sortOrder) query.append('sortOrder', sortOrder);

  const res = await fetch(`/api/tasks/user/${userId}?${query.toString()}`);
  const data = await res.json();
  return data;
}
