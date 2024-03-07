import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Outlet />;
  else return <Navigate to="/login" />;
};

export default ProtectedRoutes;
