const ACCESS_TOKEN_KEY = "accounting_access_token";

export const AUTH_TOKEN_CHANGED_EVENT = "auth-token-changed";

/**
 * Announces that the stored token changed.
 *
 * AuthProvider listens for this event, so anything that touches the token
 * outside React — the axios interceptor dropping it on a 401, or logout() in
 * authService — still reaches the UI. Without the announcement the screen would
 * keep showing a signed-in user whose token is already gone.
 */
function notifyAuthTokenChanged() {
    window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT));
}

export function saveAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    notifyAuthTokenChanged();
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    notifyAuthTokenChanged();
}

export function hasAccessToken() {
    return Boolean(getAccessToken());
}
