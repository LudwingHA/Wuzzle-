import { Outlet, Navigate } from "react-router-dom";
import React, { useState } from "react";

const ProtectedRoutes = () => {
  const [Aunthenticated, setAunthenticated] = useState(false);
  return Aunthenticated ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={"/login"}></Navigate>
  );
};

export default ProtectedRoutes;
