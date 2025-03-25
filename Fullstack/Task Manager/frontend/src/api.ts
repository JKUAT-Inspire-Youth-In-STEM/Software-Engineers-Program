import axios from 'axios';
import { AuthResponse, Task, TaskCreatePayload } from './types';

const api = axios.create({
  baseURL: ' http://127.0.0.1:5000',
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = (user: { username: string; password: string }) =>
  api.post<AuthResponse>('/register', user);

export const loginUser = (user: { username: string; password: string }) =>
  api.post<AuthResponse>('/login', user);

export const addTask = (task: TaskCreatePayload, token: string) =>
  api.post<AuthResponse>('/tasks', task, { headers: { Authorization: `Bearer ${token}` } });

export const getTasks = (token: string) =>
  api.get<Task[]>('/tasks', { headers: { Authorization: `Bearer ${token}` } });