import axiosInstance from '@/utils/axios';

export const classService = {
    getClasses: async (params = {}) => {
        const response = await axiosInstance.get('/classes', {params});
        return response.data;
    },
    getClassDetail: async (id) => {
        const response = await axiosInstance.get(`/classes/${id}`);
        return response.data;
    },
    deleteClasses: async (id) => {
        const response = await axiosInstance.delete(`/classes/${id}`);
        return response.data;
    },
    createClass: async (body) => {
        const response = await axiosInstance.post(`/classes`, body);
        return response.data;
    },

    updateClass: async (id, body) => {
        const response = await axiosInstance.put(`/classes/${id}`, body);
        return response.data;
    }
}
