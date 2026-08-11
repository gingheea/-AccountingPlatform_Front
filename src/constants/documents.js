export const DOCUMENT_CATEGORIES = [
    { value: 0, label: "Податкова звітність" },
    { value: 1, label: "Рахунок" },
    { value: 2, label: "Акт" },
    { value: 3, label: "Договір" },
    { value: 4, label: "Банківська виписка" },
    { value: 5, label: "Квитанція" },
    { value: 6, label: "Інше" },
];

export const DOCUMENT_DIRECTIONS = [
    { value: 0, label: "Від клієнта" },
    { value: 1, label: "Від бухгалтера" },
];

export const DOCUMENT_STATUSES = [
    { value: 0, label: "Завантажено" },
    { value: 1, label: "На перевірці" },
    { value: 2, label: "Прийнято" },
    { value: 3, label: "Відхилено" },
    { value: 4, label: "В архіві" },
];

export const DOCUMENT_STATUS_CLASSES = {
    0: "bg-blue-50 text-blue-700",
    1: "bg-yellow-50 text-yellow-700",
    2: "bg-green-50 text-green-700",
    3: "bg-red-50 text-red-700",
    4: "bg-brand-soft text-brand-muted",
};

// Mirrors AllowedDocumentContentTypes on the API — keep both lists in sync.
export const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "text/plain",
    "text/csv",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/x-zip-compressed",
].join(",");

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

function labelFrom(options, value) {
    return options.find((option) => option.value === value)?.label ?? "—";
}

export const categoryLabel = (value) => labelFrom(DOCUMENT_CATEGORIES, value);
export const directionLabel = (value) => labelFrom(DOCUMENT_DIRECTIONS, value);
export const statusLabel = (value) => labelFrom(DOCUMENT_STATUSES, value);

export function formatFileSize(bytes) {
    if (!bytes) return "—";

    if (bytes < 1024) return `${bytes} Б`;

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

export function formatDocumentDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
