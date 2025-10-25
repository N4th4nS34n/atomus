import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { fetchTasks as fetchTasksAPI } from './api/fetchTasks';
import { createTask as createTaskAPI } from './api/createTask';
import { updateTaskStatus as updateTaskStatusAPI } from './api/updateTaskStatus';
import { deleteTask as deleteTaskAPI } from './api/deleteTask';

export function useTasks(userId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterUrgency, setFilterUrgency] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (!userId) return;
    fetchTasks();
  }, [userId, filterUrgency, filterPriority, filterStatus, sortBy, sortOrder]);

  const fetchTasks = async () => {
    const data = await fetchTasksAPI({ userId, filterUrgency, filterPriority, filterStatus, sortBy, sortOrder });
    setTasks(data);
  };

  const createTask = async (task: Omit<Task, 'id' | 'status'>) => {
    await createTaskAPI(task);
    fetchTasks();
  };

  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    await updateTaskStatusAPI(taskId, status);
    fetchTasks();
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskAPI(taskId);
    fetchTasks();
  };

  const sortOrderMap = { High: 3, Medium: 2, Low: 1 };
  const sortedTasks = [...tasks];

  if (sortBy === 'urgency') {
    sortedTasks.sort((a, b) =>
      sortOrder === 'asc'
        ? sortOrderMap[a.urgency] - sortOrderMap[b.urgency]
        : sortOrderMap[b.urgency] - sortOrderMap[a.urgency]
    );
  }

  if (sortBy === 'priority') {
    sortedTasks.sort((a, b) =>
      sortOrder === 'asc'
        ? sortOrderMap[a.priority] - sortOrderMap[b.priority]
        : sortOrderMap[b.priority] - sortOrderMap[a.priority]
    );
  }

  return {
    tasks: sortedTasks,
    filterUrgency,
    setFilterUrgency,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
  };
}
