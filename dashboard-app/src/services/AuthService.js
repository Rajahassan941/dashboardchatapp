import axios from 'axios';

const API_URL = 'https://dashboardchatapp-backend.vercel.app';

const AuthService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default AuthService;
