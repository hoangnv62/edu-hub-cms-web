import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { classService } from '@/services/class.service';

export const useClassStudents = (classId, params = {}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    if (!classId) return;
    try {
      setLoading(true);
      const data = await classService.getClassStudents(classId, params);
      setStudents(data);
    } catch (error) {
      toast.error(error?.response?.data?.errorDescription || 'Có lỗi xảy ra khi tải danh sách học sinh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classId, JSON.stringify(params)]);

  return { students, loading, refetch: fetchStudents };
};
