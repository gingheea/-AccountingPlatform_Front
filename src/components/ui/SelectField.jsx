"use client";

import { RxChevronDown } from "react-icons/rx";

/**
 * A select field styled to match the project.
 *
 * A native <select> is drawn by the browser: its own font, arrow and padding,
 * all different on macOS, Windows and Android. appearance-none strips that
 * styling and we draw the rest ourselves, so it looks the same everywhere.
 */
export default function SelectField({ className = "", children, ...props }) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`w-full appearance-none rounded-button border border-brand-border bg-brand-pampas py-2.5 pl-4 pr-10 font-body text-sm font-medium text-brand-ink outline-none transition-colors focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            >
                {children}
            </select>

            {/* pointer-events-none so a click on the arrow opens the list
                instead of being swallowed by the icon on top of it. */}
            <RxChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-brand-muted" />
        </div>
    );
}
