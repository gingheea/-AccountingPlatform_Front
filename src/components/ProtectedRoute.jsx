import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getHomeRouteForRoles } from "../utils/jwt";

/**
 * @param allowedRoles Якщо задано, у маршрут пускає лише власників цих ролей.
 *                     Решту відправляє в їхній власний кабінет, а не на логін —
 *                     вони автентифіковані, просто не сюди.
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
