import apiClient from './client';

export const categoriesApi = {
  getAll: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/categories', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};
