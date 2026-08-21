/**
 * How many numbers to show around the current one. 1 means previous, current
 * and next, plus the first and last pages, which are always shown.
 */
const SIBLINGS = 1;

/** How many pages still fit without any gaps. */
const MAX_WITHOUT_GAPS = 7;

/**
 * Builds the list of pagination buttons: numbers, and placeholder strings
 * where pages are skipped.
 *
 * Without this, 40 pages would line up 40 buttons. The first and last always
 * stay: they are the ones people most often jump to.
 *
 * Kept in its own file rather than inside the component because it is pure
 * logic: it can be tested without rendering a single button.
 */
export function buildPageNumbers(currentPage, totalPages) {
    if (totalPages <= MAX_WITHOUT_GAPS) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set([1, totalPages, currentPage]);

    for (let offset = 1; offset <= SIBLINGS; offset++) {
        pages.add(currentPage - offset);
        pages.add(currentPage + offset);
    }

    const sorted = [...pages]
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b);

    // Insert a placeholder wherever neighbouring numbers have a gap between them.
    const result = [];

    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) {
            result.push(`gap-${page}`);
        }

        result.push(page);
    });

    return result;
}
