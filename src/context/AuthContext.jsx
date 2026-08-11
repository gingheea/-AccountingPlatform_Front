import { createContext, useEffect, useMemo, useState } from "react";
import {
    AUTH_TOKEN_CHANGED_EVENT,
    getAccessToken,
    saveAccessToken,
    removeAccessToken,
} from "../services/tokenStorage";
import { ROLES, decodeToken, getRolesFromToken, isTokenExpired } from "../utils/jwt";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => getAccessToken());

    useEffect(() => {
        const syncToken = () => {
            setToken(getAccessToken());
        };

        window.addEventListener(AUTH_TOKEN_CHANGED_EVENT, syncToken);

        return () => {
            window.removeEventListener(AUTH_TOKEN_CHANGED_EVENT, syncToken);
        };
    }, []);

    const value = useMemo(() => {
        // Протермінований токен — це не автентифікація: інакше користувач
        // потрапляв би в кабінет, де кожен запит одразу віддає 401.
        const isValid = Boolean(token) && !isTokenExpired(token);
        const roles = isValid ? getRolesFromToken(token) : [];

        return {
            token,
            isAuthenticated: isValid,
            roles,
            isAdmin: roles.includes(ROLES.admin),
            email: isValid ? decodeToken(token)?.email ?? null : null,
            login: (newToken) => {
                saveAccessToken(newToken);
                setToken(newToken);
            },
            logout: () => {
                removeAccessToken();
                setToken(null);
            },
        };
    }, [token]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
