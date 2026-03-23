import api from '../api/axiosConfig';

export const ideaService = {
  submitIdea: async (ideaData) => {
    const response = await api.post('/ideas/submit', ideaData);
    return response.data;
  },

  getAllIdeas: async (page = 0, size = 10) => {
    const response = await api.get(`/ideas/all?page=${page}&size=${size}`);
    return response.data;
  },

  getApprovedIdeas: async () => {
    const response = await api.get('/ideas/approved');
    return response.data;
  },

  approveIdea: async (id) => {
    const response = await api.put(`/ideas/approve/${id}`);
    return response.data;
  },

  deleteIdea: async (id) => {
    const response = await api.delete(`/ideas/delete/${id}`);
    return response.data;
  },

  rejectIdea: async (id) => {
    const response = await api.put(`/ideas/reject/${id}`);
    return response.data;
  },

  getIdeasByUser: async (username) => {
    const response = await api.get(`/ideas/user/${username}`);
    return response.data;
  },

  // AI Assistant Methods
  generateAIIdeas: async (category) => {
    const response = await api.post('/ai/generate-ideas', { category });
    return response.data;
  },

  generateAIDescription: async (title) => {
    const response = await api.post('/ai/generate-description', { title });
    return response.data;
  }
};
