import api from "../api/axiosInstance";

export async function getClientRequests() {
    const response = await api.get("/client-requests");
    return response.data;
}

export async function getClientRequestById(id) {
    const response = await api.get(`/client-requests/${id}`);
    return response.data;
}

export async function createClientRequest(payload) {
    const response = await api.post("/client-requests", payload);
    return response.data;
}

export async function changeClientRequestStatus(id, status) {
    await api.patch(`/client-requests/${id}/status`, { status });
}

export async function changeClientRequestAdminNote(id, adminNote) {
    await api.patch(`/client-requests/${id}/admin-note`, { adminNote });
}

export async function completeClientRequest(id) {
    await api.patch(`/client-requests/${id}/complete`);
}

export async function rejectClientRequest(id) {
    await api.patch(`/client-requests/${id}/reject`);
}

export async function assignClientRequestToUser(id, userId) {
    await api.patch(`/client-requests/${id}/assign-user`, { userId });
}

export async function unassignClientRequestUser(id) {
    await api.patch(`/client-requests/${id}/unassign-user`);
}

export async function deleteClientRequest(id) {
    await api.delete(`/client-requests/${id}`);
}