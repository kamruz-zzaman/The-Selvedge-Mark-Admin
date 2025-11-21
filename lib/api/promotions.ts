import apiClient from './client';

export const promotionsApi = {
  getAll: async () => {
    const response = await apiClient.get('/promotions');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/promotions/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/promotions', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/promotions/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/promotions/${id}`);
    return response.data;
  },

  validate: async (code: string, orderTotal: number) => {
    const response = await apiClient.post('/promotions/validate', { code, orderTotal });
    return response.data;
  },
};
