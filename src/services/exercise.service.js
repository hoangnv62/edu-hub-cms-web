import axiosInstance from '@/utils/axios';

export const exerciseService = {
  getExercises: async (params = {}) => {
    const response = await axiosInstance.get('/tasks', { params });
    return response.data;
  },
  getExerciseDetail: async (id) => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  },
  createExercise: async (body) => {
    const response = await axiosInstance.post('/tasks', body);
    return response.data;
  },
  updateExercise: async (id, body) => {
    const response = await axiosInstance.put(`/tasks/${id}`, body);
    return response.data;
  },
  deleteExercise: async (id) => {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  },
  toggleStatus: async (id) => {
    const response = await axiosInstance.patch(`/tasks/${id}`);
    return response.data;
  },
};
