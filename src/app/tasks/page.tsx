'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description?: string;
  urgency: 'Low' | 'Medium' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  status: 'ToDo' | 'InProgress' | 'Finished';
};

const userId = 'test-user-1';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return null;

  async function fetchTasks() {
    const res = await fetch(`/api/tasks/user/${userId}`);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function createTask() {
    if (!title) return;
    await fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, urgency, priority, userId }),
    });
    setTitle('');
    setDescription('');
    setUrgency('Low');
    setPriority('Low');
    fetchTasks();
  }

  async function updateTaskStatus(taskId: string, status: Task['status']) {
    await fetch('/api/tasks/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, status }),
    });
    fetchTasks();
  }

  async function deleteTask(taskId: string) {
    await fetch('/api/tasks/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    });
    fetchTasks();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>

      <div className="mb-6 p-4 border rounded-lg space-y-2">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2 flex-wrap">
          <select value={urgency} onChange={(e) => setUrgency(e.target.value as any)} className="p-2 border rounded">
            <option value="Low">Low Urgency</option>
            <option value="Medium">Medium Urgency</option>
            <option value="High">High Urgency</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="p-2 border rounded">
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button
            onClick={createTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 && (
          <p className="text-gray-600 italic">No tasks yet. Create one above!</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">
                Urgency: {task.urgency} | Priority: {task.priority} | Status:{' '}
                {task.status}
              </p>
            </div>

            <div className="flex gap-2">
              {task.status === 'ToDo' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'InProgress')}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Start
                </button>
              )}
              {task.status === 'InProgress' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'Finished')}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Finish
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
