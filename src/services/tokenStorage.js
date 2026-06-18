const ACCESS_TOKEN_KEY = "accounting_access_token";

export const AUTH_TOKEN_CHANGED_EVENT = "auth-token-changed";

function notifyAuthTokenChanged() {
    window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT));
}

export function  saveAccessToken(token)
{
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function  getAccessToken()
{
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function  removeAccessToken()
{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function hasAccessToken() {
    return Boolean(getAccessToken());
}