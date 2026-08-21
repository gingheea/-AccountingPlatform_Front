import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getHomeRouteForRoles } from "../utils/jwt";

/**
 * @param allowedRoles When set, only holders of these roles are let through.
 *                     Everyone else is sent to their own area, not to login:
 *                     they are authenticated, just not for this route.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
    const { isAuthenticated, roles } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (allowedRoles && !allowedRoles.some((role) => roles.includes(role))) {
        return <Navigate to={getHomeRouteForRoles(roles)} replace />;
    }

    return children;
}
