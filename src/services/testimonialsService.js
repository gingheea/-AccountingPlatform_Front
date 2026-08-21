import api from "../api/axiosInstance";
import { buildParams, toPage } from "./paging";

/* ---------- Public pages ---------- */

/**
 * Returns { items, total }. Total lets the page know whether anything is left
 * to load; otherwise it would have to guess from the response size.
 */
export async function getPublishedTestimonials({ skip = 0, take = 6 } = {}) {
    const { data } = await api.get("/testimonials/published", {
        params: { skip, take },
    });

    return {
        items: Array.isArray(data?.items) ? data.items : [],
        total: Number(data?.total ?? 0),
    };
}

/* ---------- Client portal ---------- */

/** Returns null when the client has not left a testimonial yet. */
export async function getMyTestimonial() {
    const { data } = await api.get("/portal/testimonial");

    return data ?? null;
}

export async function submitMyTestimonial(payload) {
    const { data } = await api.post("/portal/testimonial", payload);

    return data;
}

/* ---------- Admin panel ---------- */

/** Returns { items, total }. */
export async function getTestimonials(params = {}) {
    const { data } = await api.get("/testimonials", { params: buildParams(params) });

    return toPage(data);
}

export async function approveTestimonial(id) {
    await api.post(`/testimonials/${id}/approve`);
}

export async function rejectTestimonial(id, note) {
    await api.post(`/testimonials/${id}/reject`, { note });
}

export async function deleteTestimonial(id) {
    await api.delete(`/testimonials/${id}`);
}
