import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api';
const getToken = () => Cookies.get('token');

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const fetchTasksAPI = async () => {
  const token = getToken();
  if (!token) throw new Error('No token');

  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch tasks');
  return data;
};

export const addTaskAPI = async (taskData) => {
  const token = getToken();
  if (!token) throw new Error('No token');

  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add task');
  return data;
};

export const deleteTaskAPI = async (taskId) => {
  const token = getToken();
  if (!token) throw new Error('No token');

  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return true;
};

export const updateStatusAPI = async (taskId, status) => {
  const token = getToken();
  if (!token) throw new Error('No token');

  const res = await fetch(`${API_URL}/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update status');
  return true;
};
