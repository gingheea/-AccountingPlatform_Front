import api from "../api/axiosInstance";
import { buildParams, toPage } from "./paging";

export async function getPortalMe() {
    const response = await api.get("/portal/me");
    return response.data;
}

/** Повертає { items, total }. */
export async function getMyClientRequests(params = {}) {
    const response = await api.get("/portal/client-requests", {
        params: buildParams(params),
    });

    return toPage(response.data);
}

export async function changeOwnPassword(currentPassword, newPassword) {
    await api.post("/portal/change-password", { currentPassword, newPassword });
}