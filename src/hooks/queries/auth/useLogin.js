import {useState} from "react";
import {authenticate} from "@/services/auth.service.js";
import {toastPromise} from "@/utils/toast-promise.js";
import {setToken, setUser} from "@/utils/localStorage.js";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);

    const login =
        async (payload) => {
            try {
                setLoading(true);
                const data =
                    await toastPromise(
                        authenticate(payload),
                        {
                            loading: "Đang đăng nhập...",
                            success: "Đăng nhập thành công",
                            error: (error) =>
                                error?.response?.data?.errorDescription
                        }
                    );
                setToken(data.accessToken);
                setUser(data.user);
                return data;
            } finally {
                setLoading(false);
            }
        };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return {
        login,
        logout,
        loading
    };
};