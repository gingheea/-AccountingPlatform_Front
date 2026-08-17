import api from "../api/axiosInstance";

/* ---------- Кабінет клієнта ---------- */

export async function getMySubscriptions() {
    const response = await api.get("/portal/subscriptions");
    return response.data;
}

/* ---------- Адмінка ---------- */

export async function getSubscriptions(filters = {}) {
    const params = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params[key] = value;
        }
    });

    const response = await api.get("/client-subscriptions", { params });
    return response.data;
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
