import toast from "react-hot-toast";

export const toastPromise = (promise, { loading, success, error }) =>
    toast.promise(promise, {
        loading,
        success,
        error,
    });
