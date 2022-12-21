import React from "react";
import { Navigate } from "react-router-dom";

const IsloggedIn = ({ children }) => {
  const isadmin = localStorage.getItem("admin");
  if (isadmin) {
    return <Navigate to="/dashboard" />;
  }
  if (!isadmin) {
    return <Navigate to="/homepage" />;
  }
  return children;
};

export default IsloggedIn;
