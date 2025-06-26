import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const rawToken = params.get('token');
        const userId = params.get('userId');

        if (!rawToken || !userId) {
            console.error('Missing token or userId in URL');
            navigate('/login?error=oauth', { replace: true });
            return;
        }

        const decodedToken = decodeURIComponent(rawToken);

        axios.defaults.headers.common['Authorization'] = `Bearer ${decodedToken}`;

        axios.get(`http://localhost:8080/api/v1/auth/${userId}`)
            .then((response) => {
                const userData = response.data?.data;
                console.log('User data from API:', userData);

                if (userData) {
                    login(decodedToken, userId, userData.doctorId, userData.patientId)
                        .then((res) => {
                            if (!res.success) {
                                navigate('/login?error=auth', { replace: true });
                            }
                        });
                } else {
                    console.error('User data not found in response');
                    navigate('/login?error=auth', { replace: true });
                }
            })
            .catch((err) => {
                console.error('Error fetching user data:', err);
                navigate('/login?error=auth', { replace: true });
            });
    }, [location, navigate, login]);

    return (
        <div className="min-h-screen grid place-content-center">
            <svg
                className="animate-spin h-6 w-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            <span className="sr-only">Signing in…</span>
        </div>
    );
};

export default OAuth2RedirectHandler;