import { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext();
const TOKEN = "token_app";
const USERNAME = 'username'

export default function AuthProvide({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(
    window.localStorage.getItem(TOKEN)
  );

  const [userAuth, setUserAuth] = useState(
    window.localStorage.getItem(USERNAME)
  );

  const login = useCallback(() => {
    window.localStorage.setItem(TOKEN, true);
    setAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN, true);
    window.localStorage.removeItem(USERNAME, userAuth);
    setAuthenticated(false);
    setUserAuth("");
  }, []);

  const usernameAuth = (username) => {
    window.localStorage.setItem(USERNAME, username);
    setUserAuth(username);
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      usernameAuth,
      isAuthenticated,
      userAuth,
    }),
    [isAuthenticated, userAuth, login, usernameAuth, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
