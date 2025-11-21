import apiClient from './client';

export const dashboardApi = {
  getStats: async () => {
    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  getRecentOrders: async (limit: number = 5) => {
    const response = await apiClient.get(`/dashboard/recent-orders?limit=${limit}`);
    return response.data;
  },
};
