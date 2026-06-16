import api from "../api/axiosInstance";

export async function getUsers() {
    const response = await api.get("/users");
    return response.data;
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

export async function resetUserPassword(id, newPassword) {
    await api.patch(`/users/${id}/reset-password`, {
        newPassword,
    });
}