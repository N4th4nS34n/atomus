type TaskFiltersProps = {
  filterUrgency: string;
  setFilterUrgency: (value: string) => void;
  filterPriority: string;
  setFilterPriority: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
};

export default function TaskFilters({
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
}: TaskFiltersProps) {
  return (
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
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="p-2 bg-slate-800 border border-slate-700 rounded-md text-sm flex-1 md:flex-none"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <button
        onClick={() => {
          setFilterUrgency('');
          setFilterPriority('');
          setFilterStatus('');
          setSortBy('');
          setSortOrder('asc');
        }}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-sm transition w-full md:w-auto"
      >
        Reset
      </button>
    </section>
  );
}
