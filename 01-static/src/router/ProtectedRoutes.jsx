import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";


const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes