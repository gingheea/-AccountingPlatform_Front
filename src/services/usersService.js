import api from "../api/axiosInstance";
import { buildParams, fetchAllPages, toPage } from "./paging";

/** Повертає { items, total }. Пошук і фільтр статусу виконує сервер. */
export async function getUsers(params = {}) {
    const response = await api.get("/users", { params: buildParams(params) });

    return toPage(response.data);
}

/**
 * Увесь список без сторінок — для випадних списків і підстановки імен
 * у таблицях заявок, документів та обслуговування.
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
 * Видаляє акаунт назовсім. Разом з ним зникають документи (і файли у сховищі),
 * обслуговування та відгук. Заявки лишаються, але без звʼязку з клієнтом.
 */
export async function deleteUser(id) {
    await api.delete(`/users/${id}`);
}

export async function resetUserPassword(id, newPassword) {
    await api.patch(`/users/${id}/reset-password`, {
        newPassword,
    });
}