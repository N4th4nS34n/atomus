import { useState } from 'react';
import { Task } from '../types/task';

type TaskFormProps = {
  userId?: string;
  onCreate: (task: Omit<Task, 'id' | 'status'>) => void;
};

export default function TaskForm({ userId, onCreate }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  const handleSubmit = () => {
    if (!userId) return;
    onCreate({ title, description, urgency, priority, userId });
    setTitle('');
    setDescription('');
    setUrgency('Low');
    setPriority('Low');
  };

  return (
    <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-indigo-300">Create a new task</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
        />
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as any)}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-indigo-500"
          >
            <option value="Low">Low Urgency</option>
            <option value="Medium">Medium Urgency</option>
            <option value="High">High Urgency</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-indigo-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button
            onClick={handleSubmit}
            className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow-md w-full sm:w-auto"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
