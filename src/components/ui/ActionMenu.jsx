"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RxChevronDown } from "react-icons/rx";

/**
 * An action menu for a table row.
 *
 * Why not a <select>: picking an item here is a command, not a field value.
 * You click "Complete" and it happens. A select is not meant for that
 * and looks alien among our buttons.
 *
 * Why the list is rendered through createPortal, outside the table:
 * the table uses overflow-x-auto for horizontal scrolling, and that clips
 * anything sticking out, so the dropdown would be cut in half.
 * A portal moves it straight into <body>, where nothing clips it.
 */
export default function ActionMenu({ label, items, disabled = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    // useLayoutEffect rather than useEffect: the coordinates must be computed
    // before the browser paints, otherwise the menu jumps in from a corner.
    useLayoutEffect(() => {
        if (!isOpen || !buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();

        setPosition({
            top: rect.bottom + 6,
            left: rect.left,
            width: Math.max(rect.width, 176),
        });
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const close = (event) => {
            if (buttonRef.current?.contains(event.target)) return;
            if (menuRef.current?.contains(event.target)) return;

            setIsOpen(false);
        };

        const onKeyDown = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        // The menu has fixed coordinates, so scrolling the page would leave it
        // floating away from its button; closing it is simpler.
        const onScroll = () => setIsOpen(false);

        document.addEventListener("mousedown", close);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("scroll", onScroll, true);
        window.addEventListener("resize", onScroll);

        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onScroll);
        };
    }, [isOpen]);

    if (!items?.length) return null;

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="inline-flex w-full items-center justify-between gap-2 rounded-button border border-brand-border bg-white px-3 py-2 text-xs font-semibold text-brand-ink transition-colors hover:border-brand-madison hover:bg-brand-pampas disabled:cursor-not-allowed disabled:opacity-60"
            >
                {label}

                <RxChevronDown
                    className={`size-4 text-brand-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        role="menu"
                        style={{ top: position.top, left: position.left, minWidth: position.width }}
                        className="fixed z-[60] overflow-hidden rounded-card border border-brand-border bg-white p-1 shadow-card"
                    >
                        {items.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setIsOpen(false);
                                    item.onSelect();
                                }}
                                className={`block w-full rounded-button px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-brand-pampas ${
                                    item.tone === "danger"
                                        ? "text-red-700 hover:bg-red-50"
                                        : "text-brand-ink"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>,
                    document.body,
                )}
        </>
    );
}
