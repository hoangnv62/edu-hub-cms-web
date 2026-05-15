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
    },
    getClassStudents: async (classId, params = {}) => {
        const response = await axiosInstance.get(`/classes/${classId}/students`, { params });
        return response.data;
    },
    addStudentToClass: async (classId, studentId) => {
        const response = await axiosInstance.post(`/classes/${classId}/students`, { studentId });
        return response.data;
    },
    removeStudentFromClass: async (classId, studentId) => {
        const response = await axiosInstance.delete(`/classes/${classId}/students/${studentId}`);
        return response.data;
    },
}
