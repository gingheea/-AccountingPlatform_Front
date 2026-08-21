import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../services/paging";

/**
 * State of a paged list: the page itself, the filters and reloading.
 *
 * Six admin and portal pages would do this identically, so the logic lives in
 * one place. A page is left to render the rows and the pagination bar.
 *
 * @param fetchPage a function ({ page, pageSize, ...filters }) => { items, total }
 * @param options.initialFilters initial filter values
 * @param options.initialPageSize how many rows per page
 * @param options.onError what to do with an error (usually show a toast)
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

    // Bumped after an action (delete, status change) to force a refetch.
    const [reloadKey, setReloadKey] = useState(0);

    /*
     * Current values for the handlers below.
     *
     * Held in a ref rather than in useCallback dependencies: otherwise each of
     * these functions would be recreated whenever the page or a filter changes.
     * Pages put them in their own effect dependencies, and a new function every
     * time meant an endless render loop. That bug has already happened here.
     */
    const stateRef = useRef({ page, pageSize, filters, items });

    // The ref is updated in an effect, not during render: writing to a ref while
    // rendering breaks on a repeated render (React draws twice in development),
    // and the linter rightly forbids it.
    //
    // An effect with no dependency array runs after every render, so by the time
    // any handler fires the values are already fresh.
    useEffect(() => {
        stateRef.current = { page, pageSize, filters, items };
    });

    // Filters in the effect dependencies must be a string, not an object: a new
    // object with the same values counts as different to React, and the effect
    // would run on every render.
    const filtersKey = JSON.stringify(filters);

    useEffect(() => {
        // A guard against updating the state of an unmounted component, and against
        // races: switching pages quickly can let the first response arrive after the
        // second one and overwrite fresher data.
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
        // fetchPage and onError are deliberately not dependencies: pages pass them
        // as fresh arrow functions on every render, and the effect would never stop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, filtersKey, reloadKey]);

    /**
     * Changing a filter always returns to page one. Otherwise you could stay on
     * page seven of a list that now has only two pages and see emptiness
     * instead of results.
     *
     * The early return is essential: without it every call would build a new
     * filters object, React would treat the state as changed, and a page calling
     * setFilter from an effect would loop forever.
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
     * After deleting the last row on a page there is no point staying on it:
     * it is now empty. Step back to the previous one.
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
