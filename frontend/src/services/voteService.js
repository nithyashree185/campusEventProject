import api from '../api/axiosConfig';

export const voteService = {
  castVote: async (userId, eventId) => {
    const response = await api.post('/votes/cast', { userId, eventId });
    return response.data;
  },

  getVotesCount: async () => {
    const response = await api.get('/ideas/votes');
    return response.data;
  },

  getTrending: async () => {
    const response = await api.get('/ideas/trending');
    return response.data;
  },

  getStatus: async () => {
    const response = await api.get('/ideas/status');
    return response.data;
  },

  getVotedEvents: async (userId) => {
    const response = await api.get(`/votes/user/${userId}`);
    return response.data;
  }
};
