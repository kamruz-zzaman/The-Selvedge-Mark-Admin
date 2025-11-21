import apiClient from './client';

export const reportsApi = {
  getSalesReport: async (period?: string) => {
    const response = await apiClient.get('/reports/sales', { params: { period } });
    return response.data;
  },

  getTopProducts: async (limit: number = 5) => {
    const response = await apiClient.get('/reports/products/top', { params: { limit } });
    return response.data;
  },

  getTopCustomers: async (limit: number = 5) => {
    const response = await apiClient.get('/reports/customers/top', { params: { limit } });
    return response.data;
  },
};
