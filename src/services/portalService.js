import api from "../api/axiosInstance";

export async function getPortalMe() {
    const response = await api.get("/portal/me");
    return response.data;
}

export async function getMyClientRequests() {
    const response = await api.get("/portal/client-requests");
    return response.data;
}