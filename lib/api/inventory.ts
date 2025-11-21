import apiClient from './client';

export const inventoryApi = {
  getAll: async () => {
    const response = await apiClient.get('/inventory');
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get('/inventory/stats');
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/inventory/${id}`, data);
    return response.data;
  },
};
