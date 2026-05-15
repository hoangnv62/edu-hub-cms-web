import axiosInstance from '@/utils/axios';

export const userService = {
  createUser: async (body) => {
    const response = await axiosInstance.post('/users', body);
    return response.data;
  },
  searchStudents: async (params = {}) => {
    const response = await axiosInstance.get('/users', { params: { ...params, role: 'ROLE_STUDENT' } });
    return response.data;
  },
};

// backward-compat named export (used by register page)
export const createUser = userService.createUser;
