import React, { createContext, useState, useEffect } from "react";
import authService from "./../api/services/authService.js";
import userService from "./../api/services/userService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    role: null,
    userInfo: null,
    isLoading: true,
  });

  const updateUserInfo = (newInfo) => {
    setAuthState((prev) => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        ...newInfo,
      },
    }));
  };

  const fetchUserInfo = async () => {
    try {
      const info = await userService.getUserInfo();
      setAuthState((prev) => ({
        ...prev,
        userInfo: info,
      }));
      return info;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    }
  };

  const loginGuest = async () => {
    setAuthState({
      isLoggedIn: true,
      role: "guest",
      userInfo: null,
      isLoading: false,
    });
  };

  const mapRole = (roleId) => {
    switch (roleId) {
      case 1:
        return "user";
      case 2:
        return "admin";
      case 3:
        return "moderator";
      default:
        return "guest";
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { isLoggedIn, role } = await authService.checkAuth();

        if (isLoggedIn) {
          const userInfo = await fetchUserInfo();
          setAuthState({
            isLoggedIn: true,
            role: mapRole(role), // Convertir le rôle numérique
            userInfo,
            isLoading: false,
          });
        } else {
          setAuthState({
            isLoggedIn: false,
            role: null,
            userInfo: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Auth init error:", error);
        setAuthState({
          isLoggedIn: false,
          role: null,
          userInfo: null,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const data = await authService.login(email, password);
      const decoded = authService.decodeToken(data.token);
      const userInfo = await fetchUserInfo();

      setAuthState({
        isLoggedIn: true,
        role: mapRole(decoded.role), // Convertir le rôle numérique
        userInfo: {
          ...userInfo,
          token: data.token,
        },
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await authService.logout();
    setAuthState({
      isLoggedIn: false,
      role: null,
      isLoading: false,
      userInfo: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        token: authState.userInfo?.token ?? null, // ✅ Ajouté ici
        login,
        logout,
        fetchUserInfo,
        updateUserInfo,
        loginGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
