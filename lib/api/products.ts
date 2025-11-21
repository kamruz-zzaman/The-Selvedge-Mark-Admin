import apiClient from './client';

export const productsApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },

  uploadImages: async (files: FormData) => {
    const response = await apiClient.post('/products/upload', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
