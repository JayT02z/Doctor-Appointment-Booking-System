// src/components/RecaptchaWrapper.jsx
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaWrapper = ({ show, onChange }) => {
    if (!show) return null;
    return (
        <div className="mt-4">
            <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={onChange} />
        </div>
    );
};

export default RecaptchaWrapper;