import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "", // Thêm trường "Confirm Password"
    email: "",
    phone: "",
    role: "patient", // Fixed role as patient
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/sendOTP", { email: formData.email });
      toast.success("OTP sent to your email");
      setOtpSent(true);
      setOtpTimer(300);
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/verifyOTP", {
        email: formData.email,
        otp: otp,
      });
      if (res.data.data === true) {
        toast.success("OTP verified");
        setOtpVerified(true);

        // Tạo tài khoản sau khi OTP được xác thực
        const response = await axios.post("http://localhost:8080/api/v1/auth/register", formData);
        if (response.data.message === "Success") {
          toast.success("Registration successful!");
          navigate("/login");
        } else {
          toast.error(response.data.message || "Registration failed");
        }
      } else {
        toast.error("Invalid OTP");
        console.log("OTP verification failed:", res.data);
      }
    } catch (err) {
      toast.error("OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/resendOTP", { email: formData.email });
      toast.success("OTP resent");
      setOtpTimer(300);
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!otpVerified) {
      if (validateForm()) {
        handleSendOTP();
      }
      return;
    }

    // Nếu OTP đã được xác minh, tạo tài khoản
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
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.username ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.phone ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className={`appearance-none relative block w-full px-3 py-2 border ${
                        errors.confirmPassword ? "border-red-300" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    isLoading
                        ? "bg-primary-400 cursor-not-allowed"
                        : "bg-primary-600 hover:bg-primary-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
                {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>

        {otpSent && !otpVerified && (
            <div className="space-y-4">
              <input
                  type="text"
                  maxLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
              />
              <div className="text-sm text-gray-500">
                OTP expires in {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
              </div>
              <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="w-full py-2 bg-primary-600 text-white rounded-md"
                >
                  Verify OTP
                </button>
                <button
                    type="button"
                    onClick={handleResendOTP}
                    className="w-full py-2 bg-gray-300 text-black rounded-md"
                    disabled={otpTimer > 0}
                >
                  Resend OTP
                </button>
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Register;
