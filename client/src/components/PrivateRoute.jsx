// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/Login/Login";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="login" />;
};
