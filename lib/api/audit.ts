import apiClient from './client';

export const auditApi = {
  getLogs: async (params?: any) => {
    const response = await apiClient.get('/audit', { params });
    return response.data;
  },
};
