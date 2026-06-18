import { createContext, useEffect, useState } from "react";
import {
    AUTH_TOKEN_CHANGED_EVENT,
    getAccessToken,
    saveAccessToken,
    removeAccessToken,
} from "../services/tokenStorage";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => getAccessToken());

    const isAuthenticated = Boolean(token);

    useEffect(() => {
        const syncToken = () => {
            setToken(getAccessToken());
        };

        window.addEventListener(AUTH_TOKEN_CHANGED_EVENT, syncToken);

        return () => {
            window.removeEventListener(AUTH_TOKEN_CHANGED_EVENT, syncToken);
        };
    }, []);

    const login = (newToken) => {
        saveAccessToken(newToken);
        setToken(newToken);
    };

    const logout = () => {
        removeAccessToken();
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}