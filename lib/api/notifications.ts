import apiClient from './client';

export const notificationsApi = {
  getAll: async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await apiClient.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await apiClient.put('/notifications/read-all');
    return response.data;
  },
};
