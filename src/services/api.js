import axios from 'axios';

const api = axios.create({
  baseURL: "http://api-pedido-erp-gateway-prod.saurus.net.br",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;