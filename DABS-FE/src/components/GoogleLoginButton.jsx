// src/components/GoogleLoginButton.jsx
import { GoogleLogin } from '@react-oauth/google';
import { useLogin } from '../hooks/useLogin';

const GoogleLoginButton = () => {
    const { login } = useLogin();

    const handleSuccess = async (credentialResponse) => {
        if (!credentialResponse?.credential) return;
        try {
            await login('google', credentialResponse.credential);
        } catch (e) {
            console.error('Google login failed:', e);
        }
    };

    const handleError = () => {
        console.error('Google login was unsuccessful');
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap auto_select />;
};

export default GoogleLoginButton;