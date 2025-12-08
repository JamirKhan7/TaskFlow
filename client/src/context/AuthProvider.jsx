import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
// import { jwtDecode } from "jwt-decode"; // Optional: if you want to decode details immediately

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  // The login function we will call from the form
  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });

      const token = response.data.token;
      const user = response.data.user;

      // Store in State
      setAuth({ user, token });

      // Store in LocalStorage (for persistence on refresh)
      localStorage.setItem('token', token);

      // Configure Axios to use this token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return true;
    } catch (error) {
      throw error.response?.data?.error || "Login failed";
    }
  };

  const logout = () => {
    setAuth({});
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
