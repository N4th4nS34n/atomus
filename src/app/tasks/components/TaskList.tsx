import { Task } from '../types/task';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onUpdateStatus: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskList({ tasks, onUpdateStatus, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-slate-500 italic text-center py-10">No tasks yet. Create one above!</p>;
  }

  return (
    <section className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task.userId} task={task} onUpdateStatus={onUpdateStatus} onDelete={onDelete} />
      ))}
    </section>
  );
}
