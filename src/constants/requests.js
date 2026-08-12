/**
 * Дзеркало доменних enum'ів з беку. Тримати числа в одному місці, а не
 * розписувати по компонентах: саме розсинхрон таких мап зсунув усі статуси
 * на одиницю й ламав відображення.
 *
 * УВАГА: RequestStatus на беку нумерується з 1, а RequestType — з 0.
 */
export const REQUEST_STATUS = {
    New: 1,
    InProgress: 2,
    WaitingForClient: 3,
    Completed: 4,
    Rejected: 5,
};

export const REQUEST_STATUS_LABELS = {
    [REQUEST_STATUS.New]: "Нова",
    [REQUEST_STATUS.InProgress]: "В роботі",
    [REQUEST_STATUS.WaitingForClient]: "Очікує клієнта",
    [REQUEST_STATUS.Completed]: "Завершена",
    [REQUEST_STATUS.Rejected]: "Відхилена",
};

export const REQUEST_STATUS_CLASSES = {
    [REQUEST_STATUS.New]: "bg-blue-50 text-blue-700",
    [REQUEST_STATUS.InProgress]: "bg-yellow-50 text-yellow-700",
    [REQUEST_STATUS.WaitingForClient]: "bg-purple-50 text-purple-700",
    [REQUEST_STATUS.Completed]: "bg-green-50 text-green-700",
    [REQUEST_STATUS.Rejected]: "bg-red-50 text-red-700",
};

/** Заявки, які ще в роботі — те, що має бути на очах у бухгалтера. */
export const ACTIVE_REQUEST_STATUSES = [
    REQUEST_STATUS.New,
    REQUEST_STATUS.InProgress,
    REQUEST_STATUS.WaitingForClient,
];

export const REQUEST_TYPE = {
    Service: 0,
    Package: 1,
    GeneralConsultation: 2,
};

export const REQUEST_TYPE_LABELS = {
    [REQUEST_TYPE.Service]: "Послуга",
    [REQUEST_TYPE.Package]: "Пакет",
    [REQUEST_TYPE.GeneralConsultation]: "Консультація",
};

export const REQUEST_TYPE_CLASSES = {
    [REQUEST_TYPE.Service]: "bg-brand-pampas text-brand-madison",
    [REQUEST_TYPE.Package]: "bg-brand-madison text-white",
    [REQUEST_TYPE.GeneralConsultation]: "bg-brand-soft text-brand-muted",
};

// API віддає числа, але historically трапляються й рядкові імена enum'а —
// приводимо до числа, щоб мапи працювали в обох випадках.
export function normalizeStatus(status) {
    if (typeof status === "number") return status;

    return REQUEST_STATUS[status] ?? status;
}

export function normalizeType(type) {
    if (typeof type === "number") return type;

    return REQUEST_TYPE[type] ?? type;
}

export const statusLabel = (status) =>
    REQUEST_STATUS_LABELS[normalizeStatus(status)] ?? "Невідомо";

export const statusClass = (status) =>
    REQUEST_STATUS_CLASSES[normalizeStatus(status)] ?? "bg-brand-soft text-brand-muted";

export const typeLabel = (type) =>
    REQUEST_TYPE_LABELS[normalizeType(type)] ?? "Невідомо";

export const typeClass = (type) =>
    REQUEST_TYPE_CLASSES[normalizeType(type)] ?? "bg-brand-soft text-brand-gothic";

export const isActiveRequest = (status) =>
    ACTIVE_REQUEST_STATUSES.includes(normalizeStatus(status));
