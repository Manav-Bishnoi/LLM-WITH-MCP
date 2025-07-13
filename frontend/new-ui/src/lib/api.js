import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const toolsApi = {
  getTools: (params) => axios.get(`${API_URL}/tools`, { params }),
  createTool: (data) => axios.post(`${API_URL}/tools`, data),
  updateTool: (id, data) => axios.put(`${API_URL}/tools/${id}`, data),
  deleteTool: (id) => axios.delete(`${API_URL}/tools/${id}`),
  testTool: (id) => axios.post(`${API_URL}/tools/${id}/test`),
};

export const chatApi = {
  sendMessage: (tool_id, message, context) =>
    axios.post(`${API_URL}/chat`, { tool_id, message, context }),
};

export const statsApi = { getStats: () => axios.get(`${API_URL}/stats`) };
