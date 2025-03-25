import React, { useEffect, useState } from 'react';
import { addTask, getTasks } from '../api';
import { Task } from '../types';

interface DashboardProps {
  token: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<number>(0);
  const [startNow, setStartNow] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(token);
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTask(
        { title, description, duration, start_now: startNow, done: false },
        token
      );
      setTitle('');
      setDescription('');
      setDuration(0);
      fetchTasks();
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={startNow}
            onChange={(e) => setStartNow(e.target.checked)}
            className="mr-2"
          />
          Start Now
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Task
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white p-4 rounded shadow-md flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Start: {new Date(task.start_time).toLocaleString()}</p>
                  <p>Duration: {task.duration} minutes</p>
                  <p>Status: {task.done ? 'Done' : 'Pending'}</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                    Mark {task.done ? 'Undone' : 'Done'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;