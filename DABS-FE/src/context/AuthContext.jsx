
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedDoctorId = localStorage.getItem("doctorId");
    const storedPatientId = localStorage.getItem("patientId");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    if (storedDoctorId) {
      setDoctorId(Number(storedDoctorId));
    }
    if (storedPatientId) {
      setPatientId(Number(storedPatientId));
    }

    setLoading(false);
  }, []);

  const login = async (token, userId, doctorIdFromApi, patientIdFromApi) => {
    try {
      setToken(token);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (doctorIdFromApi) {
        setDoctorId(doctorIdFromApi);
        localStorage.setItem("doctorId", doctorIdFromApi);
      }
      if (patientIdFromApi) {
        setPatientId(patientIdFromApi);
        localStorage.setItem("patientId", patientIdFromApi);
      }

      const response = await axios.get(`http://localhost:8080/api/v1/auth/${userId}`);
      const userData = response.data?.data;

      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        switch (userData.role) {
          case "PATIENT":
            navigate("/");
            break;
          case "DOCTOR":
            navigate("/doctor/dashboard");
            break;
          case "ADMIN":
            navigate("/admin/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error in login:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          userData
      );
      if (response.data?.success) {
        return { success: true };
      }
      return { success: false, error: response.data?.message || "Registration failed" };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setDoctorId(null);
    setPatientId(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("patientId");

    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const value = {
    user,
    token,
    patientId,
    setPatientId,
    doctorId,
    setDoctorId,
    loading,
    login,
    register,
    logout,
  };

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
