import api from "../api/axiosInstance";
import { buildParams, fetchAllPages, toPage } from "./paging";

/** Повертає { items, total }. */
export async function getClientRequests(params = {}) {
    const response = await api.get("/client-requests", { params: buildParams(params) });

    return toPage(response.data);
}

/** Усі заявки без сторінок — дашборду вони потрібні цілком, щоб рахувати статуси. */
export async function getAllClientRequests() {
    return fetchAllPages(({ page, pageSize }) => getClientRequests({ page, pageSize }));
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