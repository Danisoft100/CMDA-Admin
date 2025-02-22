import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toggleNotAllowed } from "~/redux/features/auth/authSlice";

const ProtectedRoutes = ({ restrictedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
    // If user doesn't have the right role, show modal and redirect
  } else if (restrictedRoles.includes(user.role)) {
    dispatch(toggleNotAllowed(true));
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
