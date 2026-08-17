import api from "../api/axiosInstance.js";
import { removeAccessToken} from "./tokenStorage.js";

export async function loginRequest(email, password) {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data.accessToken;
}

export function logoutRequest()
{
    removeAccessToken();
}

/**
 * Відповідь однакова незалежно від того, чи існує така пошта — так задумано
 * на беку, щоб через цю форму не можна було перевіряти чужі адреси.
 */
export async function requestPasswordReset(email) {
    await api.post("/auth/forgot-password", { email });
}

export async function resetPassword(email, token, newPassword) {
    await api.post("/auth/reset-password", { email, token, newPassword });
}