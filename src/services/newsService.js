import api from "../api/axiosInstance";

/**
 * Новини тягне наш бек, а не браузер напряму: чужий сайт не віддає CORS-заголовок,
 * тож прямий запит зі сторінки браузер би заблокував. Бек ще й кешує відповідь.
 */
export async function getLatestNews(take = 9) {
    const { data } = await api.get("/news", { params: { take } });

    return data;
}
