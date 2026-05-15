import { useState } from 'react';
import { exerciseService } from '@/services/exercise.service';
import { toastPromise } from '@/utils/toast-promise';

export const useExerciseMutations = () => {
  const [loading, setLoading] = useState(false);

  const createExercise = async (payload, callback) => {
    try {
      setLoading(true);
      const data = await toastPromise(exerciseService.createExercise(payload), {
        loading: 'Đang tạo bài tập...',
        success: 'Tạo bài tập thành công',
        error: (err) => err?.response?.data?.errorDescription || 'Có lỗi xảy ra',
      });
      callback?.(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateExercise = async (id, payload, callback) => {
    try {
      setLoading(true);
      const data = await toastPromise(exerciseService.updateExercise(id, payload), {
        loading: 'Đang cập nhật bài tập...',
        success: 'Cập nhật bài tập thành công',
        error: (err) => err?.response?.data?.errorDescription || 'Có lỗi xảy ra',
      });
      callback?.(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const deleteExercise = async (id, callback) => {
    try {
      setLoading(true);
      const data = await toastPromise(exerciseService.deleteExercise(id), {
        loading: 'Đang xóa bài tập...',
        success: 'Xóa bài tập thành công',
        error: (err) => err?.response?.data?.errorDescription || 'Có lỗi xảy ra',
      });
      callback?.(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, callback) => {
    try {
      setLoading(true);
      const data = await toastPromise(exerciseService.toggleStatus(id), {
        loading: 'Đang cập nhật trạng thái...',
        success: 'Cập nhật trạng thái thành công',
        error: (err) => err?.response?.data?.errorDescription || 'Có lỗi xảy ra',
      });
      callback?.(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createExercise, updateExercise, deleteExercise, toggleStatus };
};
