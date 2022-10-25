import React from "react";
import { HOME } from "../../config/routes/paths";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export const LoginAuth = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    // user is not authenticated
    return <Navigate to={HOME} />;
  }
  return children;
};

export default LoginAuth;
