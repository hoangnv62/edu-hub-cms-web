import { useState } from 'react';
import { classService } from '@/services/class.service';
import { toastPromise } from '@/utils/toast-promise';

export const useClassStudentMutations = () => {
  const [loading, setLoading] = useState(false);

  const addStudent = async (classId, studentId, callback) => {
    try {
      setLoading(true);
      const data = await toastPromise(classService.addStudentToClass(classId, studentId), {
        loading: 'Đang thêm học sinh...',
        success: 'Thêm học sinh thành công',
        error: (err) => err?.response?.data?.errorDescription || 'Có lỗi xảy ra',
      });
      callback?.(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = async (classId, studentId, callback) => {
    try {
      setLoading(true);
      const data = await toastPromise(classService.removeStudentFromClass(classId, studentId), {
        loading: 'Đang xóa học sinh...',
        success: 'Xóa học sinh thành công',
        error: (err) => err?.response?.data?.errorDescription || 'Có lỗi xảy ra',
      });
      callback?.(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addStudent, removeStudent };
};
