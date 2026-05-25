import api from "../api/axiosInstance";

export async function createClientRequest(payload) {
    const response = await api.post("/client-requests", payload);
    return response.data;
}