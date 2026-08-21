// The backend puts roles in the ClaimTypes.Role claim, which lands in the token as a full URI.
const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export const ROLES = {
    admin: "Admin",
    user: "User",
};

export function decodeToken(token) {
    if (!token) return null;

    try {
        const payload = token.split(".")[1];

        if (!payload) return null;

        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

        // atob returns bytes, so non-Latin text has to be decoded as UTF-8 separately.
        const json = new TextDecoder().decode(
            Uint8Array.from(atob(base64), (char) => char.charCodeAt(0)),
        );

        return JSON.parse(json);
    } catch (error) {
        console.error("Failed to decode access token:", error);
        return null;
    }
}

export function getRolesFromToken(token) {
    const claim = decodeToken(token)?.[ROLE_CLAIM];

    if (!claim) return [];

    // A single role arrives as a string, several as an array.
    return Array.isArray(claim) ? claim : [claim];
}

export function isTokenExpired(token) {
    const exp = decodeToken(token)?.exp;

    if (!exp) return false;

    return exp * 1000 <= Date.now();
}

/**
 * Where to send a user after login. Admin and client have different areas,
 * and without this a client landed in the admin panel where everything is 403.
 */
export function getHomeRouteForRoles(roles) {
    return roles.includes(ROLES.admin) ? "/admin" : "/portal";
}
