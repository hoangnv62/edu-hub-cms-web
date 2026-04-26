import axiosInstance from '@/utils/axios';

export const createUser = async (body) => {
  const response = await axiosInstance.post('/users', body);
  return response.data;
};
