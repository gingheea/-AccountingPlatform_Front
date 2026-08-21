/**
 * Mirrors TestimonialStatus from the backend. NOTE: numbering starts at 1, not 0.
 * The numbers live in one place: a drift between such maps once shifted
 * every request status.
 */
export const TESTIMONIAL_STATUS = {
    Pending: 1,
    Approved: 2,
    Rejected: 3,
};

export const TESTIMONIAL_STATUS_LABELS = {
    [TESTIMONIAL_STATUS.Pending]: "На розгляді",
    [TESTIMONIAL_STATUS.Approved]: "Опубліковано",
    [TESTIMONIAL_STATUS.Rejected]: "Відхилено",
};

export const TESTIMONIAL_STATUS_CLASSES = {
    [TESTIMONIAL_STATUS.Pending]: "bg-yellow-50 text-yellow-700",
    [TESTIMONIAL_STATUS.Approved]: "bg-green-50 text-green-700",
    [TESTIMONIAL_STATUS.Rejected]: "bg-red-50 text-red-700",
};

export const testimonialStatusLabel = (status) =>
    TESTIMONIAL_STATUS_LABELS[status] ?? "Невідомо";

export const testimonialStatusClass = (status) =>
    TESTIMONIAL_STATUS_CLASSES[status] ?? "bg-brand-soft text-brand-muted";

export const TESTIMONIAL_MIN_LENGTH = 20;
export const TESTIMONIAL_MAX_LENGTH = 1000;

/** Initials for the avatar circle: "Maria Petrenko" becomes "MP". */
export function authorInitials(name) {
    if (!name) return "?";

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

/**
 * Three card styles cycled in turn: light, white and dark. Each used to be
 * written out separately in the markup; now there can be any number of
 * testimonials, so the style is picked by position.
 */
export const TESTIMONIAL_TONES = [
    {
        card: "border-brand-border bg-brand-pampas",
        quote: "text-brand-ink",
        avatar: "bg-brand-madison text-white",
        name: "text-brand-ink",
        role: "text-brand-muted",
        more: "text-brand-madison hover:text-brand-madisonDark",
    },
    {
        card: "border-brand-border bg-white",
        quote: "text-brand-ink",
        avatar: "bg-brand-tan text-brand-ink",
        name: "text-brand-ink",
        role: "text-brand-muted",
        more: "text-brand-madison hover:text-brand-madisonDark",
    },
    {
        card: "border-brand-border bg-brand-madison shadow-card",
        quote: "text-white",
        avatar: "bg-white text-brand-madison",
        name: "text-white",
        role: "text-white/65",
        more: "text-brand-tan hover:text-white",
    },
];

