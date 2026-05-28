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