const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── Token helpers ──────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('hrr_admin_token');
const setToken = (t) => localStorage.setItem('hrr_admin_token', t);
const clearToken = () => localStorage.removeItem('hrr_admin_token');

// ── Core fetch wrapper ─────────────────────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }

  return data;
};

// Multipart form (for file uploads)
const requestForm = async (endpoint, formData, method = 'POST') => {
  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { method, headers, body: formData });
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }

  return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────
export const authApi = {
  login: async (email, password) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
  },
  me: () => request('/auth/me'),
  logout: async () => {
    try { await request('/auth/logout', { method: 'POST' }); } catch {}
    clearToken();
  },
  isLoggedIn: () => !!getToken(),
};

// ── Jobs ──────────────────────────────────────────────────────────────────
export const jobsApi = {
  getPublic: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/jobs${qs ? '?' + qs : ''}`);
  },
  getAll: () => request('/jobs/all'),
  getById: (id) => request(`/jobs/${id}`),
  create: (data) => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  toggle: (id) => request(`/jobs/${id}/toggle`, { method: 'PATCH' }),
  delete: (id) => request(`/jobs/${id}`, { method: 'DELETE' }),
};

// ── Applications ──────────────────────────────────────────────────────────
export const applicationsApi = {
  submit: (formData) => requestForm('/applications', formData),
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/applications${qs ? '?' + qs : ''}`);
  },
  getById: (id) => request(`/applications/${id}`),
  updateStatus: (id, status, notes) =>
    request(`/applications/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, notes }) }),
  downloadResume: (id) => `${BASE_URL}/applications/${id}/resume?token=${getToken()}`,
  delete: (id) => request(`/applications/${id}`, { method: 'DELETE' }),
};

// ── Contacts ──────────────────────────────────────────────────────────────
export const contactsApi = {
  submit: (data) => request('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/contacts${qs ? '?' + qs : ''}`);
  },
  updateStatus: (id, status, notes) =>
    request(`/contacts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, notes }) }),
  delete: (id) => request(`/contacts/${id}`, { method: 'DELETE' }),
};

// ── Admin ──────────────────────────────────────────────────────────────────
export const adminApi = {
  getStats: () => request('/admin/stats'),
};
