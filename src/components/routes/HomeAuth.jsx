import React from "react";
import { LOGIN } from "../../config/routes/paths";
import { Navigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export const HomeAuth = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // user is not authenticated
    return <Navigate to={LOGIN} />;
  }
  return children;
};


export default HomeAuth;