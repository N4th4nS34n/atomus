export type Task = {
  userId: string;
  title: string;
  description?: string;
  urgency: 'Low' | 'Medium' | 'High';
  priority: 'Low' | 'Medium' | 'High';
  status: 'ToDo' | 'InProgress' | 'Finished';
};
