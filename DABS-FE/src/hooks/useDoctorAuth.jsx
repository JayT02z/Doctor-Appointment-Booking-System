import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useDoctorAuth = () => {
    const { doctorId, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'DOCTOR' && doctorId === null) {
            toast((t) => (
                <div className="text-yellow-900">
                    ⚠️ Please{' '}
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            navigate('/doctor/information');
                        }}
                        className="underline text-yellow-800 font-semibold"
                    >
                        update your doctor information
                    </button>{' '}
                    to access all features.
                </div>
            ), {
                icon: '⚠️',
                duration: 10000,
                style: {
                    background: '#FEF9C3',
                    border: '1px solid #FCD34D',
                    color: '#92400E',
                },
            });
        }
    }, [doctorId, user, navigate]);

    return { doctorId, user };
};
