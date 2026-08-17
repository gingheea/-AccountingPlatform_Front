"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RxChevronDown } from "react-icons/rx";

/**
 * Меню дій для рядка таблиці.
 *
 * Чому не <select>: там обрання пункту не «значення поля», а команда —
 * натиснув «Завершити» і воно виконалось. Селект для цього не призначений
 * і виглядає як чужий елемент серед наших кнопок.
 *
 * Чому список малюється через createPortal, тобто окремо від таблиці:
 * у таблиці стоїть overflow-x-auto для горизонтальної прокрутки, а він
 * обрізає все, що виходить за межі — випадне меню зникало б наполовину.
 * Portal виносить його прямо в <body>, де обрізати нема чому.
 */
export default function ActionMenu({ label, items, disabled = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    // useLayoutEffect, а не useEffect: координати треба порахувати до того,
    // як браузер намалює меню, інакше воно смикнеться з кута екрана.
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

        // Меню має фіксовані координати, тож при прокручуванні сторінки
        // воно б «відʼїхало» від кнопки — простіше закрити.
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
