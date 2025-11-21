import apiClient from './client';

export const settingsApi = {
  getAll: async (category?: string) => {
    const response = await apiClient.get('/settings', { params: { category } });
    return response.data;
  },

  update: async (key: string, value: any, category?: string) => {
    const response = await apiClient.put(`/settings/${key}`, { value, category });
    return response.data;
  },

  bulkUpdate: async (settings: Record<string, any>) => {
    const response = await apiClient.post('/settings/bulk', { settings });
    return response.data;
  },
};
