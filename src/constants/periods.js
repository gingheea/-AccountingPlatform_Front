/**
 * Mirrors PeriodKind and PeriodStatus from the backend.
 * NOTE: both start at 1, not 0 — same rule as everywhere else in this project.
 */
export const PERIOD_KIND = {
    Monthly: 1,
    Quarterly: 2,
};

export const PERIOD_KIND_LABELS = {
    [PERIOD_KIND.Monthly]: "Щомісяця",
    [PERIOD_KIND.Quarterly]: "Щокварталу",
};

export const PERIOD_STATUS = {
    Open: 1,
    Closed: 2,
};

export const PERIOD_STATUS_LABELS = {
    [PERIOD_STATUS.Open]: "У роботі",
    [PERIOD_STATUS.Closed]: "Закрито",
};

export const PERIOD_STATUS_CLASSES = {
    [PERIOD_STATUS.Open]: "bg-yellow-50 text-yellow-700",
    [PERIOD_STATUS.Closed]: "bg-green-50 text-green-700",
};

export const periodStatusLabel = (status) => PERIOD_STATUS_LABELS[status] ?? "Невідомо";

export const periodStatusClass = (status) =>
    PERIOD_STATUS_CLASSES[status] ?? "bg-brand-soft text-brand-muted";

export const periodKindLabel = (kind) => PERIOD_KIND_LABELS[kind] ?? "—";

const MONTHS = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
];

const QUARTERS = ["I квартал", "II квартал", "III квартал", "IV квартал"];

/** "Серпень 2026" or "III квартал 2026" — one place, so the two screens agree. */
export function periodTitle(period) {
    if (!period) return "—";

    const name =
        period.kind === PERIOD_KIND.Quarterly
            ? QUARTERS[period.number - 1]
            : MONTHS[period.number - 1];

    return `${name ?? period.number} ${period.year}`;
}

/** Options for the number picker: months or quarters, depending on the kind. */
export function periodNumberOptions(kind) {
    const names = kind === PERIOD_KIND.Quarterly ? QUARTERS : MONTHS;

    return names.map((label, index) => ({ value: index + 1, label }));
}

export function formatDueDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

/**
 * How many days are left before the deadline. Negative means it has passed.
 * Compared date-to-date, with the time of day dropped: "tomorrow" must not
 * become "today" just because it is now the evening.
 */
export function daysUntil(dueDate) {
    if (!dueDate) return null;

    const due = new Date(dueDate);
    const today = new Date();

    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return Math.round((due - today) / 86400000);
}
