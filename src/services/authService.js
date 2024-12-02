import apiClient from './apiClient';

const login = async (email, password) => {
  const { data } = await apiClient.post('/api/auth/login', {
    email,
    password,
    isLoggedInHere: 0,
  });
  return data;
};

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userIdentity');
};

export const authService = { login, logout };
