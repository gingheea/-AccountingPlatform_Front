import { useEffect, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../services/paging";

/**
 * Стан посторінкового списку: сама сторінка, фільтри й перезавантаження.
 *
 * Шість сторінок адмінки й кабінету робили б це однаково, тому логіка живе
 * одним місцем. Сторінці лишається намалювати рядки й смугу гортання.
 *
 * @param fetchPage функція ({ page, pageSize, ...filters }) → { items, total }
 * @param options.initialFilters початкові значення фільтрів
 * @param options.initialPageSize скільки рядків на сторінці
 * @param options.onError що робити з помилкою (зазвичай показати toast)
 */
export function usePagedList(fetchPage, {
    initialFilters = {},
    initialPageSize = DEFAULT_PAGE_SIZE,
    onError,
} = {}) {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [filters, setFilters] = useState(initialFilters);
    const [isLoading, setIsLoading] = useState(true);

    // Змінюється після дій (видалення, зміна статусу) і змушує перечитати.
    const [reloadKey, setReloadKey] = useState(0);

    // Фільтри в залежностях мають бути рядком, а не обʼєктом: новий обʼєкт
    // із тими самими значеннями React вважає іншим, і ефект крутився б
    // на кожному рендері.
    const filtersKey = JSON.stringify(filters);

    useEffect(() => {
        // Прапорець проти оновлення стану вже прибраного компонента, а заразом
        // проти «перегонів»: якщо швидко перемкнути дві сторінки, відповідь
        // першого запиту може прийти після другого й перетерти свіжі дані.
        let isActive = true;

        fetchPage({ page, pageSize, ...JSON.parse(filtersKey) })
            .then((result) => {
                if (!isActive) return;

                setItems(result.items);
                setTotal(result.total);
            })
            .catch((error) => {
                if (!isActive) return;

                console.error("Failed to load page:", error);
                onError?.(error);
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
        // fetchPage і onError навмисно не в залежностях: сторінки передають
        // їх новими стрілками на кожен рендер, і ефект крутився б без кінця.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, filtersKey, reloadKey]);

    /**
     * Зміна фільтра завжди повертає на першу сторінку. Інакше можна лишитись
     * на сьомій сторінці списку, у якому після фільтра всього дві —
     * і побачити порожнечу замість результатів.
     */
    const setFilter = (name, value) => {
        setIsLoading(true);
        setPage(1);
        setFilters((current) => ({ ...current, [name]: value }));
    };

    const changePage = (next) => {
        setIsLoading(true);
        setPage(next);
    };

    const changePageSize = (next) => {
        setIsLoading(true);
        setPage(1);
        setPageSize(next);
    };

    const reload = () => setReloadKey((key) => key + 1);

    /**
     * Після видалення останнього рядка на сторінці залишатись на ній нема сенсу —
     * вона стала порожньою. Відступаємо на попередню.
     */
    const reloadAfterRemoval = () => {
        if (items.length === 1 && page > 1) {
            changePage(page - 1);
            return;
        }

        reload();
    };

    return {
        items,
        total,
        page,
        pageSize,
        filters,
        isLoading,
        setFilter,
        changePage,
        changePageSize,
        reload,
        reloadAfterRemoval,
    };
}
