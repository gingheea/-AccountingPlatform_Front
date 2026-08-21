import { useCallback, useEffect, useRef, useState } from "react";
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

    /*
     * Поточні значення для обробників нижче.
     *
     * Через ref, а не через залежності useCallback: інакше кожна з цих функцій
     * створювалась би заново при зміні сторінки чи фільтра. Сторінки кладуть їх
     * у залежності власних ефектів, і нова функція щоразу означала б
     * нескінченний цикл рендерів. Саме на цьому я вже спіткнувся.
     */
    const stateRef = useRef({ page, pageSize, filters, items });

    // Оновлюємо ref в ефекті, а не під час рендера: запис у ref під час рендера
    // ламається при повторному рендері (React у режимі розробки малює двічі),
    // і лінтер справедливо це забороняє.
    //
    // Ефект без списку залежностей — виконується після кожного рендера, тож
    // до моменту, коли спрацює будь-який обробник, значення вже свіжі.
    useEffect(() => {
        stateRef.current = { page, pageSize, filters, items };
    });

    // Фільтри в залежностях ефекту мають бути рядком, а не обʼєктом: новий
    // обʼєкт із тими самими значеннями React вважає іншим, і ефект крутився б
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
     *
     * Ранній вихід обовʼязковий: без нього кожен виклик створював би новий
     * обʼєкт фільтрів, React вважав би стан зміненим — і сторінка, яка кличе
     * setFilter з ефекту, зациклилась би.
     */
    const setFilter = useCallback((name, value) => {
        if (stateRef.current.filters[name] === value) return;

        setIsLoading(true);
        setPage(1);
        setFilters((current) => ({ ...current, [name]: value }));
    }, []);

    const changePage = useCallback((next) => {
        if (stateRef.current.page === next) return;

        setIsLoading(true);
        setPage(next);
    }, []);

    const changePageSize = useCallback((next) => {
        if (stateRef.current.pageSize === next) return;

        setIsLoading(true);
        setPage(1);
        setPageSize(next);
    }, []);

    const reload = useCallback(() => setReloadKey((key) => key + 1), []);

    /**
     * Після видалення останнього рядка на сторінці залишатись на ній нема сенсу —
     * вона стала порожньою. Відступаємо на попередню.
     */
    const reloadAfterRemoval = useCallback(() => {
        const { page: currentPage, items: currentItems } = stateRef.current;

        if (currentItems.length === 1 && currentPage > 1) {
            changePage(currentPage - 1);
            return;
        }

        reload();
    }, [changePage, reload]);

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
