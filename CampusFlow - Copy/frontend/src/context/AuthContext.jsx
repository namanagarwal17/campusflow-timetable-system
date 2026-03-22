import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

const DEMO_USER = {
  username: "admin",
  password: "admin123",
  name: "CampusFlow Admin",
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("campusflow-auth") === "true";
    const savedUser = localStorage.getItem("campusflow-user");

    if (savedAuth && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  async function login({ username, password, remember }) {
    try {
      // Try actual API login first
      const response = await loginUser({ email: username, password });
      const nextUser = { 
        name: response.user?.name || username.split('@')[0], 
        username: username,
        token: response.access_token 
      };

      setIsAuthenticated(true);
      setUser(nextUser);

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("campusflow-auth", "true");
      storage.setItem("campusflow-user", JSON.stringify(nextUser));

      return { success: true };
    } catch (apiError) {
      // Fallback to Demo Login for local development/compatibility if needed
      const isDemo =
        username.trim() === DEMO_USER.username &&
        password === DEMO_USER.password;

      if (isDemo) {
        const nextUser = { name: DEMO_USER.name, username: DEMO_USER.username };
        setIsAuthenticated(true);
        setUser(nextUser);
        
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("campusflow-auth", "true");
        storage.setItem("campusflow-user", JSON.stringify(nextUser));
        
        return { success: true };
      }

      return { 
        success: false, 
        message: apiError.response?.data?.detail || "Invalid username or password." 
      };
    }
  }

  async function register(formData) {
    try {
      await registerUser(formData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || "Registration failed. Please try again." 
      };
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("campusflow-auth");
    localStorage.removeItem("campusflow-user");
    sessionStorage.removeItem("campusflow-auth");
    sessionStorage.removeItem("campusflow-user");
  }

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("campusflow-auth") === "true";
    const sessionUser = sessionStorage.getItem("campusflow-user");

    if (!isAuthenticated && sessionAuth && sessionUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(sessionUser));
    }
  }, [isAuthenticated]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      register,
      logout,
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}