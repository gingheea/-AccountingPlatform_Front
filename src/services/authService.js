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
 * The response is the same whether or not the address exists. That is by
 * design on the backend, so this form cannot be used to probe other addresses.
 */
export async function requestPasswordReset(email) {
    await api.post("/auth/forgot-password", { email });
}

export async function resetPassword(email, token, newPassword) {
    await api.post("/auth/reset-password", { email, token, newPassword });
}