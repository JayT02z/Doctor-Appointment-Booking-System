// src/pages/LoginPage.jsx
import { useForm, FormProvider } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin';
import TextInput from '../../components/inputs/TextInput';
import PasswordInput from '../../components/inputs/PasswordInput';
import RecaptchaWrapper from '../../components/RecaptchaWrapper';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import { useState } from 'react';

const LoginPage = () => {
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const { login, loading } = useLogin();
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(0);

    const onSubmit = async (data) => {
        try {
            const payload = { ...data, recaptchaToken };
            await login('credentials', payload);
        } catch (e) {
            setFailedAttempts(prev => prev + 1);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-slate-200">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <h2 className="text-2xl font-bold text-center text-gray-700">Đăng nhập</h2>

                        <TextInput
                            label="Tên đăng nhập"
                            name="username"
                            register={register}
                            error={errors.username?.message}
                        />

                        <PasswordInput
                            label="Mật khẩu"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />

                        <RecaptchaWrapper show={failedAttempts >= 3} onChange={setRecaptchaToken} />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2.5 rounded-xl font-semibold shadow-md disabled:opacity-60"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <hr className="flex-grow border-gray-300" />
                            <span>hoặc</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <GoogleLoginButton />
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default LoginPage;