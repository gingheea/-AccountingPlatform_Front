/**
 * Shared helpers for paged requests.
 *
 * The backend returns { items, total }. Normalised here so that no page has
 * to check whether an array or null came back.
 */

export const DEFAULT_PAGE_SIZE = 20;

/** The server-side cap. Asking for more is pointless: it truncates anyway. */
export const MAX_PAGE_SIZE = 200;

export function toPage(data) {
    return {
        items: Array.isArray(data?.items) ? data.items : [],
        total: Number(data?.total ?? 0),
    };
}

/** Strips empty values so the request does not carry ?status=&userId= */
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
 * Collects the ENTIRE list by walking the pages itself.
 *
 * Needed where a list is used as a lookup rather than for display: filling in
 * a client name in a row, counting dashboard statistics.
 * Such places cannot be limited to one page: they would silently show an
 * incomplete picture.
 *
 * A loop rather than one request with a huge pageSize: the server has a cap,
 * and as the data grows pageSize=99999 would simply be truncated in silence.
 */
export async function fetchAllPages(fetchPage, pageSize = MAX_PAGE_SIZE) {
    const all = [];

    let page = 1;

    for (;;) {
        const result = toPage(await fetchPage({ page, pageSize }));

        all.push(...result.items);

        // An empty page means stop, even if total exceeds what was collected:
        // otherwise a mismatch would turn this into an endless loop.
        if (result.items.length === 0 || all.length >= result.total) break;

        page += 1;
    }

    return all;
}
