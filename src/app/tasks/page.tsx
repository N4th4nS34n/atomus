'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTask';

export default function TasksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  const tasksHook = useTasks(userId);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6">
      <header className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-center sm:text-left">
          Welcome back, <span className="text-indigo-400">{session?.user.name || 'User'}</span> 👋
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-medium shadow-md w-full sm:w-auto"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        <TaskForm userId={userId} onCreate={tasksHook.createTask} />
        <TaskFilters
          filterUrgency={tasksHook.filterUrgency}
          setFilterUrgency={tasksHook.setFilterUrgency}
          filterPriority={tasksHook.filterPriority}
          setFilterPriority={tasksHook.setFilterPriority}
          filterStatus={tasksHook.filterStatus}
          setFilterStatus={tasksHook.setFilterStatus}
          sortBy={tasksHook.sortBy}
          setSortBy={tasksHook.setSortBy}
          sortOrder={tasksHook.sortOrder}
          setSortOrder={tasksHook.setSortOrder}
        />
        <TaskList tasks={tasksHook.tasks} onUpdateStatus={tasksHook.updateTaskStatus} onDelete={tasksHook.deleteTask} />
      </main>
    </div>
  );
}
