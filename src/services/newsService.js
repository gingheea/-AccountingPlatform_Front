import api from "../api/axiosInstance";

/**
 * News is fetched by our backend, not by the browser: the other site sends no
 * CORS header, so a direct call would be blocked. The backend also caches it.
 */
export async function getLatestNews(take = 9) {
    const { data } = await api.get("/news", { params: { take } });

    return data;
}
