// Бек віддає ролі у клеймі ClaimTypes.Role, який у токен потрапляє повним URI.
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

        // atob повертає байти, тому кирилицю треба окремо декодувати як UTF-8.
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

    // Одна роль приходить рядком, кілька — масивом.
    return Array.isArray(claim) ? claim : [claim];
}

export function isTokenExpired(token) {
    const exp = decodeToken(token)?.exp;

    if (!exp) return false;

    return exp * 1000 <= Date.now();
}

/**
 * Куди вести користувача після входу. Адмін і клієнт мають різні кабінети,
 * і без цього клієнт потрапляв в адмінку, де всі запити віддають 403.
 */
export function getHomeRouteForRoles(roles) {
    return roles.includes(ROLES.admin) ? "/admin" : "/portal";
}
