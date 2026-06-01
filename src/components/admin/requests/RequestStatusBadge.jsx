const STATUS_LABELS = {
    0: "New",
    1: "In progress",
    2: "Waiting",
    3: "Completed",
    4: "Rejected",

    New: "New",
    InProgress: "In progress",
    WaitingForClient: "Waiting",
    Completed: "Completed",
    Rejected: "Rejected",
};

const STATUS_CLASSES = {
    0: "bg-brand-pampas text-brand-madison",
    1: "bg-blue-50 text-blue-700",
    2: "bg-yellow-50 text-yellow-700",
    3: "bg-green-50 text-green-700",
    4: "bg-red-50 text-red-700",

    New: "bg-brand-pampas text-brand-madison",
    InProgress: "bg-blue-50 text-blue-700",
    WaitingForClient: "bg-yellow-50 text-yellow-700",
    Completed: "bg-green-50 text-green-700",
    Rejected: "bg-red-50 text-red-700",
};

export default function RequestStatusBadge({ status }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                STATUS_CLASSES[status] ?? "bg-brand-soft text-brand-gothic"
            }`}
        >
            {STATUS_LABELS[status] ?? status}
        </span>
    );
}