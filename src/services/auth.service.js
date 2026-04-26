import axiosInstance from '@/utils/axios';

export const authenticate = async (body) => {
  const response = await axiosInstance.post('/authenticate', body);
  return response.data;
};

export const getAccount = async () => {
  const response = await axiosInstance.get('/authenticate/me');
  return response.data;
};
