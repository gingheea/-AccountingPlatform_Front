import api from "../api/axiosInstance";
import { buildParams, toPage } from "./paging";

/**
 * axiosInstance виставляє Content-Type: application/json для всіх запитів, а
 * transformRequest в axios при JSON-заголовку серіалізує FormData у JSON —
 * файл при цьому втрачається. Тому для завантажень заголовок треба перебити:
 * побачивши FormData, axios далі сам підставить boundary.
 */
const multipart = { headers: { "Content-Type": "multipart/form-data" } };

/* ---------- Portal (client) ---------- */

/** Повертає { items, total }. */
export async function getMyDocuments(filters) {
    const response = await api.get("/portal/documents", {
        params: buildParams(filters),
    });

    return toPage(response.data);
}

export async function uploadMyDocument({ file, title, category, note }) {
    const formData = new FormData();

    formData.append("File", file);
    formData.append("Title", title);
    formData.append("Category", category);

    if (note) {
        formData.append("Note", note);
    }

    const response = await api.post("/portal/documents", formData, multipart);

    return response.data;
}

export async function getMyDocumentDownloadUrl(id) {
    const response = await api.get(`/portal/documents/${id}/download-url`);
    return response.data;
}

/* ---------- Admin ---------- */

/** Повертає { items, total }. */
export async function getDocuments(filters) {
    const response = await api.get("/client-documents", {
        params: buildParams(filters),
    });

    return toPage(response.data);
}

export async function uploadDocument({ file, userId, title, category, direction, note }) {
    const formData = new FormData();

    formData.append("File", file);
    formData.append("UserId", userId);
    formData.append("Title", title);
    formData.append("Category", category);
    formData.append("Direction", direction);

    if (note) {
        formData.append("Note", note);
    }

    const response = await api.post("/client-documents", formData, multipart);

    return response.data;
}

export async function getDocumentDownloadUrl(id) {
    const response = await api.get(`/client-documents/${id}/download-url`);
    return response.data;
}

export async function changeDocumentStatus(id, status, note) {
    await api.patch(`/client-documents/${id}/status`, {
        status,
        note: note || null,
    });
}

export async function deleteDocument(id) {
    await api.delete(`/client-documents/${id}`);
}

/**
 * Pre-signed URLs are short-lived, so they are fetched right before the click
 * and never stored in component state.
 */
export function triggerDownload(url) {
    const link = document.createElement("a");

    link.href = url;
    link.rel = "noopener";

    document.body.appendChild(link);
    link.click();
    link.remove();
}
