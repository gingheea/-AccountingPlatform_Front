"use client";

/**
 * A progress bar with its number.
 *
 * role="progressbar" plus the aria-value attributes are what make this readable
 * to a screen reader: without them it is a coloured rectangle with no meaning.
 */
export default function ProgressBar({ percent, label, tone = "default" }) {
    const value = Math.min(Math.max(Number(percent) || 0, 0), 100);

    const fill = tone === "done" ? "bg-green-600" : "bg-brand-madison";

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
                {label && <span className="text-sm text-brand-muted">{label}</span>}

                <span className="text-sm font-semibold text-brand-ink">{value}%</span>
            </div>

            <div
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2 w-full overflow-hidden rounded-full bg-brand-soft"
            >
                <div
                    className={`h-full rounded-full transition-[width] duration-300 ${fill}`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
