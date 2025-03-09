import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const PublicRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return isAuthenticated ? <Navigate to="/game" /> : <Outlet />;
};

export default PublicRoutes;