import axios from 'axios';
import { refreshTokenAPI } from '../service/AuthService';
import { setSession } from './jwt';
// ----------------------------------------------------------------------
const BASEURL = "http://10.1.122.100:8183"
const AUTHURL = "http://10.1.122.100:8183"
const axiosInstance = axios.create({ baseURL: BASEURL, timeout: 30000 });
const axiosLogin = axios.create({ baseURL: AUTHURL, timeout: 30000 });

const handleResponse = async response => {
  return (response);
};

// Request interceptor for API calls
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (accessToken) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${accessToken}`,
      'RefreshToken': `${refreshToken}`
    };
  }
  config.method = config.method.toUpperCase()
  return config;
});

axiosInstance.interceptors.response.use(handleResponse,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && (error.response.status === 403) && !originalRequest._retry) {
      // tranh lap vo han khi refresh call api
      originalRequest._retry = true;
      // refresh token
      await refreshToken();
      return axiosInstance(originalRequest);
    }

    if (error.response && (error.response.status === 401)) {
      setSession(null, null);
      window.location.href = "/auth/login";
    }

    throw (error);
  });
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const urlencoded = new URLSearchParams();
  urlencoded.append("refreshToken", refreshToken);
  //urlencoded ='refreshToken="xxxxxxxxx"'

  const { status, data, message } = await refreshTokenAPI(urlencoded);

  if (status === 200) {
    setSession(data?.access_token, data?.refresh_token);
  } else
    throw message;
};

// Request interceptor for API calls
axiosLogin.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${accessToken}`
    };
  }
  config.method = config.method.toUpperCase()
  return config;
});

axiosLogin.interceptors.response.use(handleResponse,
  async (error) => {
    throw (error);
  });


export const handleRequest = async (config) => {
  try {
    const resp = await axiosInstance(config);
    return resp;
  } catch (error) {
    console.log(error);
    if (error.response)
      return (error.response);

    return ({ code: "408", message: error.message });
  }
};

export const handleRequestLogin = async (config) => {
  try {
    const resp = await axiosLogin(config);
    return resp;
  } catch (error) {
    console.log(error);
    if (error.response)
      return (error.response);

    return ({ code: "408", message: error.message });
  }
};

export default axiosInstance;
