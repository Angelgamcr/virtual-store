import axios from "axios";

const shopApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Permite enviar y recibir cookies
  // headers: {
  //     'Content-Type': 'aplication/json'
  // }
});

// TODO: interceptores
shopApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si viene el Token
shopApi.interceptors.response.use(
  (response) => {
    if (response.data?.accessToken) {
      // Se renueva cuando se vence con el cookie
      localStorage.setItem("access-token", response.data.accessToken);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      delete response.data.accessToken;
    }
    return response;
  },
  (error) => {
    if (
      error.response?.status === 403 || //Forbidden
      error.response?.status === 401 // Unauthorized
    ) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("token-init-date");
    }
    return Promise.reject(error);
  }
);

export { shopApi };
