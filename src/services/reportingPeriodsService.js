import api from "../api/axiosInstance";
import { buildParams, fetchAllPages, toPage } from "./paging";

/* ---------- Checklist templates (admin) ---------- */

/** Returns { items, total }. */
export async function getChecklistTemplates(params = {}) {
    const { data } = await api.get("/checklist-templates", { params: buildParams(params) });

    return toPage(data);
}

/**
 * The whole list, unpaged: the period form needs every active template in its
 * picker, and a picker that silently stops at page one would hide options.
 */
export async function getAllActiveTemplates() {
    return fetchAllPages(({ page, pageSize }) =>
        getChecklistTemplates({ page, pageSize, onlyActive: true }));
}

export async function getChecklistTemplate(id) {
    const { data } = await api.get(`/checklist-templates/${id}`);

    return data;
}

export async function createChecklistTemplate(payload) {
    const { data } = await api.post("/checklist-templates", payload);

    return data;
}

export async function updateChecklistTemplate(id, payload) {
    await api.put(`/checklist-templates/${id}`, payload);
}

export async function setChecklistTemplateActive(id, isActive) {
    await api.patch(`/checklist-templates/${id}/active`, { isActive });
}

export async function deleteChecklistTemplate(id) {
    await api.delete(`/checklist-templates/${id}`);
}

/* ---------- Reporting periods (admin) ---------- */

/** Returns { items, total }. */
export async function getReportingPeriods(params = {}) {
    const { data } = await api.get("/reporting-periods", { params: buildParams(params) });

    return toPage(data);
}

export async function getReportingPeriod(id) {
    const { data } = await api.get(`/reporting-periods/${id}`);

    return data;
}

export async function createReportingPeriod(payload) {
    const { data } = await api.post("/reporting-periods", payload);

    return data;
}

export async function setPeriodTaskDone(periodId, taskId, isDone) {
    await api.patch(`/reporting-periods/${periodId}/tasks/${taskId}`, { isDone });
}

export async function addPeriodTask(periodId, title) {
    await api.post(`/reporting-periods/${periodId}/tasks`, { title });
}

export async function removePeriodTask(periodId, taskId) {
    await api.delete(`/reporting-periods/${periodId}/tasks/${taskId}`);
}

export async function setPeriodClosed(periodId, close) {
    await api.patch(`/reporting-periods/${periodId}/closed`, { close });
}

export async function deleteReportingPeriod(periodId) {
    await api.delete(`/reporting-periods/${periodId}`);
}

export async function setClientDefaultTemplate(userId, templateId) {
    await api.put(`/reporting-periods/clients/${userId}/default-template`, { templateId });
}

/* ---------- Client portal ---------- */

/** Returns { items, total }. */
export async function getMyReportingPeriods(params = {}) {
    const { data } = await api.get("/portal/reporting-periods", {
        params: buildParams(params),
    });

    return toPage(data);
}

export async function getMyReportingPeriod(id) {
    const { data } = await api.get(`/portal/reporting-periods/${id}`);

    return data;
}
