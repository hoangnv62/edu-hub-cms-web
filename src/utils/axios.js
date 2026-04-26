import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED') throw error;

    const status = error.response?.status;
    const apiMessage = error.response?.data?.errorDescription || error.response?.data?.error;

    switch (status) {
      case 401:
        // Only treat as expired session when a token was present; login failures are handled by callers
        if (localStorage.getItem('accessToken')) {
          toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          localStorage.removeItem('accessToken');
          window.dispatchEvent(new CustomEvent('unauthorized'));
        }
        break;
      case 403:
        toast.error('Bạn không có quyền truy cập tài nguyên này.');
        break;
      case 500:
        toast.error('Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.');
        break;
      default:
        if (apiMessage) toast.error(apiMessage);
        break;
    }
    throw error;
  },
);

export default axiosInstance;
