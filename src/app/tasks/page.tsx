'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description?: string;
  urgency: 'Low' | 'Medium' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  status: 'ToDo' | 'InProgress' | 'Finished';
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filterUrgency, setFilterUrgency] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchTasks();
  }, [filterUrgency, filterPriority, filterStatus, sortBy, sortOrder]);

  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      router.push("/login");
    }
  }, [status, router]);

  const userId = session?.user.id;

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return null;

  async function fetchTasks() {
    if (!userId) return;

    const query = new URLSearchParams();
    if (filterUrgency) query.append("urgency", filterUrgency);
    if (filterPriority) query.append("priority", filterPriority);
    if (filterStatus) query.append("status", filterStatus);
    if (sortBy) query.append("sortBy", sortBy);
    if (sortOrder) query.append("sortOrder", sortOrder);

    const res = await fetch(`/api/tasks/user/${userId}?${query.toString()}`);
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

  const sortOrderMap = { High: 3, Medium: 2, Low: 1 };

  let sortedTasks = [...tasks];

  if (sortBy === "urgency") {
    sortedTasks.sort((a, b) => (sortOrder === "asc" 
        ? sortOrderMap[a.urgency] - sortOrderMap[b.urgency]
        : sortOrderMap[b.urgency] - sortOrderMap[a.urgency]));
  }

  if (sortBy === "priority") {
    sortedTasks.sort((a, b) => (sortOrder === "asc" 
        ? sortOrderMap[a.priority] - sortOrderMap[b.priority]
        : sortOrderMap[b.priority] - sortOrderMap[a.priority]));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-center sm:text-left">
          Welcome back, <span className="text-indigo-400">{session?.user.name || "User"}</span> 👋
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-medium shadow-md w-full sm:w-auto"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        {/* CREATE TASK PANEL */}
        <section className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-sm">
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
                onClick={createTask}
                className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold shadow-md w-full sm:w-auto"
              >
                Add Task
              </button>
            </div>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-wrap gap-3 justify-between items-center shadow-md">
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="p-2 bg-slate-800 border border-slate-700 rounded-md text-sm flex-1 md:flex-none"
            >
              <option value="">All Urgencies</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 bg-slate-800 border border-slate-700 rounded-md text-sm flex-1 md:flex-none"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 bg-slate-800 border border-slate-700 rounded-md text-sm flex-1 md:flex-none"
            >
              <option value="">All Statuses</option>
              <option value="ToDo">To-Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Finished">Finished</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 bg-slate-800 border border-slate-700 rounded-md text-sm flex-1 md:flex-none"
            >
              <option value="">Sort By</option>
              <option value="createdAt">Creation Date</option>
              <option value="urgency">Urgency</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="p-2 bg-slate-800 border border-slate-700 rounded-md text-sm flex-1 md:flex-none"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <button
            onClick={() => {
              setFilterUrgency("");
              setFilterPriority("");
              setFilterStatus("");
              setSortBy("");
              setSortOrder("asc");
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm transition w-full md:w-auto"
          >
            Reset
          </button>
        </section>

        {/* TASKS LIST */}
        <section className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-slate-500 italic text-center py-10">
              No tasks yet. Create one above!
            </p>
          ) : (
            sortedTasks.map((task) => {
              // Map status to border only
              const statusColors = {
                ToDo: "border-red-500",
                InProgress: "border-yellow-500",
                Finished: "border-green-500",
              };

              // Map urgency/priority to badges (darkest=High)
              const urgencyColors = {
                High: { bg: "bg-slate-800", text: "text-slate-100" },
                Medium: { bg: "bg-slate-700", text: "text-slate-100" },
                Low: { bg: "bg-slate-600", text: "text-slate-100" },
              };

              const priorityColors = {
                High: { bg: "bg-slate-800", text: "text-slate-100" },
                Medium: { bg: "bg-slate-700", text: "text-slate-100" },
                Low: { bg: "bg-slate-600", text: "text-slate-100" },
              };

              return (
                <div
                  key={task.id}
                  className={`relative p-5 border-2 rounded-2xl shadow-md hover:shadow-lg transition ${statusColors[task.status]}`}
                >
                  {/* Status Badge */}
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === "ToDo"
                        ? "bg-red-500 text-slate-100"
                        : task.status === "InProgress"
                        ? "bg-yellow-500 text-slate-900"
                        : "bg-green-500 text-slate-100"
                    }`}
                  >
                    {task.status}
                  </div>

                  <h3 className="text-lg font-semibold text-indigo-300">{task.title}</h3>
                  {task.description && (
                    <p className="text-slate-400 text-sm mt-1">{task.description}</p>
                  )}

                  <div className="mt-2 flex flex-wrap gap-2">
                    {/* Urgency Badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${urgencyColors[task.urgency].bg} ${urgencyColors[task.urgency].text}`}>
                      Urgency: {task.urgency}
                    </span>

                    {/* Priority Badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority].bg} ${priorityColors[task.priority].text}`}>
                      Priority: {task.priority}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {task.status === "ToDo" && (
                      <button
                        onClick={() => updateTaskStatus(task.id, "InProgress")}
                        className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 rounded-md text-slate-900 font-medium text-sm"
                      >
                        Start
                      </button>
                    )}
                    {task.status === "InProgress" && (
                      <button
                        onClick={() => updateTaskStatus(task.id, "Finished")}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-md font-medium text-sm"
                      >
                        Finish
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md font-medium text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}
