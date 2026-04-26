import axiosInstance from '@/utils/axios';

export const getClasses = async () => {
  const response = await axiosInstance.get('/classes');
  return response.data;
};
