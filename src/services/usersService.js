import api from "../api/axiosInstance";
import { buildParams, fetchAllPages, toPage } from "./paging";

/** Returns { items, total }. Search and status filtering run on the server. */
export async function getUsers(params = {}) {
    const response = await api.get("/users", { params: buildParams(params) });

    return toPage(response.data);
}

/**
 * The whole list, unpaged: for dropdowns and for filling in client names in
 * the request, document and engagement tables.
 */
export async function getAllUsers() {
    return fetchAllPages(({ page, pageSize }) => getUsers({ page, pageSize }));
}

export async function getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

export async function createUser(payload) {
    const response = await api.post("/users", payload);
    return response.data;
}

export async function updateUser(id, payload) {
    await api.put(`/users/${id}`, payload);
}

export async function activateUser(id) {
    await api.patch(`/users/${id}/activate`);
}

export async function deactivateUser(id) {
    await api.patch(`/users/${id}/deactivate`);
}

export async function changeUserRoles(id, roles) {
    await api.patch(`/users/${id}/roles`, {
        roles,
    });
}

/**
 * Deletes the account for good. Documents (and their files in storage),
 * engagements and the testimonial go with it. Requests stay, but unlinked.
 */
export async function deleteUser(id) {
    await api.delete(`/users/${id}`);
}

export async function resetUserPassword(id, newPassword) {
    await api.patch(`/users/${id}/reset-password`, {
        newPassword,
    });
}