import apiClient from './client';

export const ordersApi = {
  getAll: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  updateToDelivered: async (id: string) => {
    const response = await apiClient.put(`/orders/${id}/deliver`);
    return response.data;
  },
};
