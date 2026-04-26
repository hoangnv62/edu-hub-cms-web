import {useState} from "react";
import {classService} from "@/services/class.service.js";
import {toastPromise} from "@/utils/toast-promise.js";

export const useClassMutations = () => {
    const [loading, setLoading] = useState(false);
    const createClass = async (payload, callback) => {
        try {
            setLoading(true);
            const data = await toastPromise(
                classService.createClass(payload),
                {
                    loading: "Đang tạo lớp học",
                    success: "Tạo lớp học thành công",
                    error: (error) => error?.response?.data?.errorDescription || "Có lỗi xảy ra"
                }
            )
            callback?.(data)
            return data;
        } finally {
            setLoading(false);
        }
    }

    const updateClass = async (id, payload, callback) => {
        try {
            setLoading(true);
            const data = await toastPromise(
                classService.updateClass(id, payload),
                {
                    loading: "Đang cập nhật lớp học",
                    success: "Cập nhật lớp học thành công",
                    error: (error) => error?.response?.data?.errorDescription || "Có lỗi xảy ra"
                }
            )
            callback?.(data)
            return data;
        } finally {
            setLoading(false);
        }
    }

    const deleteClass = async (id, callback) => {
        try {
            setLoading(true);
            const data = await toastPromise(
                classService.deleteClasses(id),
                {
                    loading: "Đang xóa lớp học",
                    success: "Xóa lớp học thành công",
                    error: (error) => error?.response?.data?.errorDescription || "Có lỗi xảy ra"
                }
            )
            callback?.(data)
            return data;
        } finally {
            setLoading(false);
        }
    }
    return {
        loading,
        createClass,
        updateClass,
        deleteClass,
    }
}