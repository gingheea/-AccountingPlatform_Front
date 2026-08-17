import api from "../api/axiosInstance";

export async function subscribeToNewsletter(email, source) {
    await api.post("/newsletter/subscribe", { email, source });
}
