import {useEffect, useState} from 'react'
import {classService} from "@/services/class.service.js";
import toast from "react-hot-toast";

export const useClasses = (params = {}) => {
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchClasses = async () => {
        try {
            setLoading(true)
            const classes = await classService.getClasses(params);
            setClasses(classes)
        } catch (error) {
            toast.error(error.response.data.errorDescription)
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchClasses();
    }, [JSON.stringify(params)]);
    return {
        classes,
        loading,
        refetch: fetchClasses,
    }
}