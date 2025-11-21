import apiClient from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },
};
