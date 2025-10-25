import { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  onUpdateStatus: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskItem({ task, onUpdateStatus, onDelete }: TaskItemProps) {
  const statusColors = {
    ToDo: 'border-red-500',
    InProgress: 'border-yellow-500',
    Finished: 'border-green-500',
  };

  const badgeColors = {
    High: { bg: 'bg-slate-800', text: 'text-slate-100' },
    Medium: { bg: 'bg-slate-700', text: 'text-slate-100' },
    Low: { bg: 'bg-slate-600', text: 'text-slate-100' },
  };

  return (
    <div key={task.userId} className={`relative p-5 border-2 rounded-2xl shadow-md hover:shadow-lg transition ${statusColors[task.status]}`}>
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${task.status === 'ToDo' ? 'bg-red-500 text-slate-100' : task.status === 'InProgress' ? 'bg-yellow-500 text-slate-900' : 'bg-green-500 text-slate-100'}`}>
        {task.status}
      </div>
      <h3 className="text-lg font-semibold text-indigo-300">{task.title}</h3>
      {task.description && <p className="text-slate-400 text-sm mt-1">{task.description}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[task.urgency].bg} ${badgeColors[task.urgency].text}`}>Urgency: {task.urgency}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[task.priority].bg} ${badgeColors[task.priority].text}`}>Priority: {task.priority}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {task.status === 'ToDo' && <button onClick={() => onUpdateStatus(task.userId, 'InProgress')} className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 rounded-md text-slate-900 font-medium text-sm">Start</button>}
        {task.status === 'InProgress' && <button onClick={() => onUpdateStatus(task.userId, 'Finished')} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-md font-medium text-sm">Finish</button>}
        <button onClick={() => onDelete(task.userId)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md font-medium text-sm">Delete</button>
      </div>
    </div>
  );
}
