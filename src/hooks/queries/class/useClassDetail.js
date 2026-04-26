import {useEffect, useState} from 'react'
import {classService} from "@/services/class.service.js";
import toast from "react-hot-toast";
export const useClassDetail = (id) => {
    const [classDetail, setClassDetail] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if(!id) return;
        const loadClassDetail =async () => {
            try{
                setLoading(true)
                const classDetail = await classService.getClassDetail(id)
                setClassDetail(classDetail)
            }
            catch(error){
                toast.error(error.response.data.errorDescription)
            }
            finally{
                setLoading(false)
            }
        };
        loadClassDetail();
    },[id])
    return {classDetail, loading}
}