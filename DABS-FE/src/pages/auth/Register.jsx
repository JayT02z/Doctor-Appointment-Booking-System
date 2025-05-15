import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    role: "patient",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const otpInputRef = useRef(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    if (otpSent && otpTimer === 0) {
      setOtpExpired(true);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  useEffect(() => {
    if (otpSent) {
      otpInputRef.current && otpInputRef.current.focus();
    }
  }, [otpSent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;
    setIsSendingOtp(true);
    try {
      await axios.post("http://localhost:8080/api/v1/auth/sendOTP", {
        email: formData.email,
      });
      toast.success("OTP sent to your email");
      setOtpSent(true);
      setOtpTimer(300);
      setOtpExpired(false);
    } catch (err) {
      toast.error("Failed to send OTP");
      console.error(err);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/verifyOTP", {
        email: formData.email,
        otp: otp,
      });
      if (res.data.data === true) {
        toast.success("OTP verified");
        setOtpVerified(true);
      } else {
        toast.error("Invalid OTP");
        setErrors({ ...errors, otp: "Invalid OTP" });
      }
    } catch (err) {
      toast.error("OTP verification failed");
      setErrors({ ...errors, otp: "OTP verification failed" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResendingOtp(true);
    try {
      await axios.post("http://localhost:8080/api/v1/auth/resendOTP", {
        email: formData.email,
      });
      toast.success("OTP resent");
      setOtpTimer(300);
      setOtpExpired(false);
    } catch (err) {
      toast.error("Failed to resend OTP");
    } finally {
      setIsResendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setIsOtpLoading(true); // Bắt đầu loading OTP
      await handleSendOTP(); // Đợi handleSendOTP hoàn thành
      setIsOtpLoading(false); // Kết thúc loading OTP
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          formData
      );
      if (response.data.message === "Success") {
        toast.success("Registration successful!");
        await register(formData.username, formData.password, formData.role);
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(
          error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your patient account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500"
              >
                sign in to your existing account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Username */}
              <div>
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 bg-white border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.username
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 bg-white border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 bg-white border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 bg-white border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.password
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className={`mt-1 appearance-none block w-full px-3 py-2 bg-white border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                )}
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  disabled={isOtpLoading || isLoading || (otpSent && !otpVerified)}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                      isOtpLoading || isLoading || (otpSent && !otpVerified)
                          ? "bg-primary-400 cursor-not-allowed"
                          : "bg-primary-600 hover:bg-primary-700 cursor-pointer"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
              >
                {isSendingOtp ? (
                    <>
                      <FaSpinner className="animate-spin mr-2 h-5 w-5 text-white"/>
                      Sending OTP...
                    </>
                ) : isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2 h-5 w-5 text-white"/>
                      Registering...
                    </>
                ) : otpSent ? "Next" : "Register"}
              </button>
            </div>
          </form>

          {otpSent && !otpVerified && (
              <div className="space-y-4">
                <input
                    type="text"
                    maxLength={6}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                        errors.otp ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    ref={otpInputRef}
                />
                {errors.otp && (
                    <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                )}
                {otpExpired ? (
                    <p className="text-red-500">OTP has expired. Please resend.</p>
                ) : (
                    <div className="text-sm text-gray-500">
                      OTP expires in{" "}
                      <span className="font-semibold">
                  {Math.floor(otpTimer / 60)}:
                        {String(otpTimer % 60).padStart(2, "0")}
                </span>
                    </div>
                )}
                <div className="flex gap-2">
                  <button
                      type="button"
                      onClick={handleVerifyOTP}
                      className={`w-full py-2 rounded-md text-white ${
                          isVerifying
                              ? "bg-primary-400 cursor-wait"
                              : "bg-primary-600 hover:bg-primary-700 cursor-pointer"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                      disabled={isVerifying}
                  >
                    {isVerifying ? (
                        <>
                          <FaSpinner className="animate-spin mr-2 h-5 w-5 text-white" />
                          Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                  </button>
                  <button
                      type="button"
                      onClick={handleResendOTP}
                      className="w-full py-2 rounded-md text-black bg-gray-300 hover:bg-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      disabled={otpTimer > 0 || isResendingOtp}
                  >
                    {isResendingOtp ? (
                        <>
                          <FaSpinner className="animate-spin mr-2 h-5 w-5 text-gray-600" />
                          Resending...
                        </>
                    ) : (
                        "Resend OTP"
                    )}
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Register;