/**
 * Дзеркало SubscriptionStatus з беку. УВАГА: нумерація з 1, не з 0.
 * Тримаємо числа тут одним місцем — саме розсинхрон таких мап колись
 * зсунув усі статуси заявок.
 */
export const SUBSCRIPTION_STATUS = {
    Active: 1,
    Paused: 2,
    Ended: 3,
};

export const SUBSCRIPTION_STATUS_LABELS = {
    [SUBSCRIPTION_STATUS.Active]: "Активне",
    [SUBSCRIPTION_STATUS.Paused]: "На паузі",
    [SUBSCRIPTION_STATUS.Ended]: "Завершене",
};

export const SUBSCRIPTION_STATUS_CLASSES = {
    [SUBSCRIPTION_STATUS.Active]: "bg-green-50 text-green-700",
    [SUBSCRIPTION_STATUS.Paused]: "bg-yellow-50 text-yellow-700",
    [SUBSCRIPTION_STATUS.Ended]: "bg-brand-soft text-brand-muted",
};

export const subscriptionStatusLabel = (status) =>
    SUBSCRIPTION_STATUS_LABELS[status] ?? "Невідомо";

export const subscriptionStatusClass = (status) =>
    SUBSCRIPTION_STATUS_CLASSES[status] ?? "bg-brand-soft text-brand-muted";

/** Назва того, що обслуговується: пакет або окрема послуга. */
export const subscriptionTitle = (subscription) =>
    subscription?.pricingPackageName || subscription?.serviceName || "Без назви";

export const subscriptionKind = (subscription) =>
    subscription?.pricingPackageId ? "Пакет" : "Послуга";

export function formatSubscriptionDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
