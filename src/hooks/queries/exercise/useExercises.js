import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { exerciseService } from '@/services/exercise.service';

export const useExercises = (params = {}) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const data = await exerciseService.getExercises(params);
      setExercises(data);
    } catch (error) {
      toast.error(error?.response?.data?.errorDescription || 'Có lỗi xảy ra khi tải danh sách bài tập');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [JSON.stringify(params)]);

  return { exercises, loading, refetch: fetchExercises };
};
