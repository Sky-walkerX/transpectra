import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api/v1",
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      // Add Bearer token to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Adding Authorization header:", config.headers.Authorization);
    } else {
      console.log("No token found in cookies");
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const apiConnector = (method, url, bodyData, headers, params) => {

  console.log("This is url", url);

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};