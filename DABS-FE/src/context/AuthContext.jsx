import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user data and token on initial load
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      // Set the token in axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (token, userId) => {
    try {
      console.log(
        "AuthContext login called with token:",
        token,
        "and userId:",
        userId
      );
      // Store the token
      setToken(token);
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Get user info using the userId
      console.log("Fetching user info with userId:", userId);
      const userResponse = await axios.get(
        `http://localhost:8080/api/v1/auth/${userId}`
      );
      console.log("User info response:", userResponse.data);

      const userData = userResponse.data.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on role
      console.log("User role:", userData.role);
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

      return { success: true };
    } catch (error) {
      console.error("Error in AuthContext login:", error);
      console.error("Error response:", error.response?.data);
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
      if (response.data.success) {
        return { success: true };
      }
      return { success: false, error: response.data.message };
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const value = {
    user,
    token,
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
