const TYPE_LABELS = {
    0: "Service",
    1: "Package",
    2: "General consultation",

    Service: "Service",
    Package: "Package",
    GeneralConsultation: "General consultation",
};

const TYPE_CLASSES = {
    0: "bg-brand-pampas text-brand-madison",
    1: "bg-brand-madison text-white",
    2: "bg-brand-soft text-brand-muted",

    Service: "bg-brand-pampas text-brand-madison",
    Package: "bg-brand-madison text-white",
    GeneralConsultation: "bg-brand-soft text-brand-muted",
};

export default function RequestTypeBadge({ requestType }) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                TYPE_CLASSES[requestType] ?? "bg-brand-soft text-brand-gothic"
            }`}
        >
            {TYPE_LABELS[requestType] ?? requestType}
        </span>
    );
}