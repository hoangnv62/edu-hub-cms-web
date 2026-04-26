import axiosInstance from '@/utils/axios';

export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
};
