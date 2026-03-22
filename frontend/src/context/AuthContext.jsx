import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

  function login({ username, password, remember }) {
    const isValid =
      username.trim() === DEMO_USER.username &&
      password === DEMO_USER.password;

    if (!isValid) {
      return { success: false, message: "Invalid username or password." };
    }

    const nextUser = { name: DEMO_USER.name, username: DEMO_USER.username };

    setIsAuthenticated(true);
    setUser(nextUser);

    if (remember) {
      localStorage.setItem("campusflow-auth", "true");
      localStorage.setItem("campusflow-user", JSON.stringify(nextUser));
    } else {
      sessionStorage.setItem("campusflow-auth", "true");
      sessionStorage.setItem("campusflow-user", JSON.stringify(nextUser));
    }

    return { success: true };
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
      logout,
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}