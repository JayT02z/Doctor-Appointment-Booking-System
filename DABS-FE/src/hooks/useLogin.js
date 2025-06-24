// src/hooks/useLogin.js
import { useState } from 'react';
import { loginWithCredentials, loginWithGoogle } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login: authLogin } = useAuth();

    const login = async (mode, payload) => {
        try {
            setLoading(true);

            const res =
                mode === 'google'
                    ? await loginWithGoogle(payload)
                    : await loginWithCredentials(payload);

            const { token, userId, doctorId, patientId } = res.data?.data || {};

            if (!token || !userId) {
                throw new Error('Missing token or userId from response');
            }

            const result = await authLogin(token, userId, doctorId, patientId);

            if (!result.success) {
                setErrors(result.error || 'Login failed');
                throw new Error(result.error || 'Login failed');
            }

            setErrors(null);
            return result;
        } catch (err) {
            setErrors(err.message || 'Something went wrong');
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { login, loading, errors };
};