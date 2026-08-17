"use client";

import { RxChevronDown } from "react-icons/rx";

/**
 * Поле вибору в стилі проєкту.
 *
 * Рідний <select> малює браузер: свій шрифт, своя стрілка, свої відступи —
 * і на macOS, Windows та Android вони різні. appearance-none прибирає це
 * оформлення, далі все малюємо самі, тож вигляд однаковий скрізь.
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

            {/* pointer-events-none — щоб клік по стрілці відкривав список,
                а не блокувався іконкою поверх нього. */}
            <RxChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-brand-muted" />
        </div>
    );
}
