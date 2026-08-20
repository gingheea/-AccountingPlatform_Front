import api from "../api/axiosInstance";

/* ---------- Публічні сторінки ---------- */

/**
 * Повертає { items, total }. Total потрібен, щоб сторінка знала, чи є
 * що довантажувати — інакше довелось би вгадувати за розміром відповіді.
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

/* ---------- Кабінет клієнта ---------- */

/** Повертає null, якщо клієнт ще не лишав відгуку. */
export async function getMyTestimonial() {
    const { data } = await api.get("/portal/testimonial");

    return data ?? null;
}

export async function submitMyTestimonial(payload) {
    const { data } = await api.post("/portal/testimonial", payload);

    return data;
}

/* ---------- Адмінка ---------- */

export async function getTestimonials(status) {
    const params = {};

    if (status !== null && status !== undefined && status !== "") {
        params.status = status;
    }

    const { data } = await api.get("/testimonials", { params });

    return data;
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
