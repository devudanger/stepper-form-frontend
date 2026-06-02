import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "http://localhost:3010/api",
  //   withCredentials: true,
  // not required Beacause automatically decided by browser
  // headers: {
  //   "Content-Type": "application/json",
  // },
  timeout: 0,
});
const ApiService = {
  get: async (url, data) => {
    try {
      const response = await api.get(url, { params: data });
      return response.data;
    } catch (error) {
      throw error.response.data?.message;
    }
  },
  post: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response.data?.message;
    }
  },
  put: async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error.response.data?.message;
    }
  },
  del: async (url, data) => {
    try {
      const response = await api.delete(url, { params: data });
      return response.data;
    } catch (error) {
      throw error.response.data?.message;
    }
  },
  // {headers: {"Content-Type": "multipart/form-data",},}
  postFilePipe: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response.data?.message;
    }
  },
};

export default ApiService;
