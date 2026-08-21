/**
 * Спільні дрібниці для посторінкових запитів.
 *
 * Бек віддає { items, total }. Тут ми це нормалізуємо, щоб жодна сторінка
 * не мусила перевіряти, чи прийшов масив, чи null.
 */

export const DEFAULT_PAGE_SIZE = 20;

/** Стеля на боці сервера. Просити більше немає сенсу — він однаково обріже. */
export const MAX_PAGE_SIZE = 200;

export function toPage(data) {
    return {
        items: Array.isArray(data?.items) ? data.items : [],
        total: Number(data?.total ?? 0),
    };
}

/** Прибирає порожні значення, щоб у запит не летіло ?status=&userId= */
export function buildParams(filters = {}) {
    const params = {};

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            params[key] = value;
        }
    });

    return params;
}

/**
 * Збирає ВЕСЬ список, гортаючи сторінки самостійно.
 *
 * Потрібно там, де список використовується не для показу, а як довідник:
 * підставити імʼя клієнта в рядок, порахувати статистику на дашборді.
 * Такі місця не можна обмежити однією сторінкою — вони мовчки показували б
 * неповну картину.
 *
 * Цикл, а не один запит із великим pageSize: сервер має стелю, і при
 * зростанні бази запит із pageSize=99999 просто мовчки обрізався б.
 */
export async function fetchAllPages(fetchPage, pageSize = MAX_PAGE_SIZE) {
    const all = [];

    let page = 1;

    for (;;) {
        const result = toPage(await fetchPage({ page, pageSize }));

        all.push(...result.items);

        // Порожня сторінка — вихід навіть якщо total більший за зібране:
        // інакше при розбіжності це був би нескінченний цикл.
        if (result.items.length === 0 || all.length >= result.total) break;

        page += 1;
    }

    return all;
}
