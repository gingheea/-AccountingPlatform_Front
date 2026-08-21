"use client";

import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { buildPageNumbers } from "../../utils/pageNumbers";

const buttonBase =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-button border px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Page navigation for admin and portal tables.
 *
 * @param page       the current page, starting at 1
 * @param pageSize   how many rows per page
 * @param total      how many rows there are overall (not on this page)
 * @param onPageChange     called with the new page number
 * @param onPageSizeChange when omitted, the size picker is not shown
 */
export default function Pagination({
                                       page,
                                       pageSize,
                                       total,
                                       onPageChange,
                                       onPageSizeChange,
                                       pageSizeOptions = [10, 20, 50, 100],
                                   }) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    // Empty list: hide everything, the list already shows its own "nothing here".
    if (total === 0) return null;

    // Everything fits on one page. The bar stays only for the size picker;
    // otherwise it adds nothing and merely takes up space.
    if (totalPages <= 1 && !onPageSizeChange) return null;

    const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const to = Math.min(page * pageSize, total);

    const goTo = (next) => {
        const clamped = Math.min(Math.max(next, 1), totalPages);

        if (clamped !== page) onPageChange(clamped);
    };

    return (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-5 lg:flex-row">
            <p className="text-sm text-brand-muted">
                Показано <span className="font-semibold text-brand-ink">{from}–{to}</span> з{" "}
                <span className="font-semibold text-brand-ink">{total}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => goTo(page - 1)}
                    disabled={page <= 1}
                    aria-label="Попередня сторінка"
                    className={`${buttonBase} border-brand-border bg-white text-brand-madison hover:bg-brand-pampas`}
                >
                    <RxChevronLeft className="size-4" />
                </button>

                {buildPageNumbers(page, totalPages).map((entry) =>
                    typeof entry === "number" ? (
                        <button
                            key={entry}
                            type="button"
                            onClick={() => goTo(entry)}
                            aria-current={entry === page ? "page" : undefined}
                            className={`${buttonBase} ${
                                entry === page
                                    ? "border-brand-madison bg-brand-madison text-white"
                                    : "border-brand-border bg-white text-brand-ink hover:bg-brand-pampas"
                            }`}
                        >
                            {entry}
                        </button>
                    ) : (
                        <span key={entry} className="px-1 text-brand-gothic">
                            …
                        </span>
                    )
                )}

                <button
                    type="button"
                    onClick={() => goTo(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Наступна сторінка"
                    className={`${buttonBase} border-brand-border bg-white text-brand-madison hover:bg-brand-pampas`}
                >
                    <RxChevronRight className="size-4" />
                </button>
            </div>

            {onPageSizeChange && (
                <label className="flex items-center gap-2 text-sm text-brand-muted">
                    Рядків:
                    <select
                        value={pageSize}
                        onChange={(event) => onPageSizeChange(Number(event.target.value))}
                        className="min-h-10 rounded-button border border-brand-border bg-white px-3 text-sm font-semibold text-brand-ink focus:border-brand-madison focus:outline-none"
                    >
                        {pageSizeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
}
