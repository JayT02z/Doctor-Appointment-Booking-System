import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useUserInfo = ({ user, token }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/auth/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.statusCode === 200) setUserInfo(res.data.data);
        } catch {
            toast.error("Failed to fetch user info");
        } finally {
            setLoading(false);
        }
    };

    const saveUserInfo = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8080/api/v1/auth/update/${user.id}`,
                userInfo,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.statusCode === 200) {
                toast.success("Account updated");
                fetchUser();
            }
        } catch {
            toast.error("Failed to update account info");
        }
    };

    return {
        userInfo,
        setUserInfo,
        saveUserInfo,
        loading,
    };
};