import api from "../api/axiosInstance";
import { toPage } from "./paging";

/* ---------- Client portal ---------- */

/** Returns { items, total }. */
export async function getMySubscriptions(params = {}) {
    const response = await api.get("/portal/subscriptions", { params });

    return toPage(response.data);
}

/* ---------- Admin panel ---------- */

export async function getSubscriptions(filters = {}) {
    const params = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params[key] = value;
        }
    });

    const response = await api.get("/client-subscriptions", { params });

    return toPage(response.data);
}

export async function createSubscription(payload) {
    const response = await api.post("/client-subscriptions", payload);
    return response.data;
}

export async function changeSubscriptionStatus(id, status) {
    await api.patch(`/client-subscriptions/${id}/status`, { status });
}

export async function deleteSubscription(id) {
    await api.delete(`/client-subscriptions/${id}`);
}
