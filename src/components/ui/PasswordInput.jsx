"use client";

import { useState } from "react";
import { Input } from "@relume_io/relume-ui";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

/**
 * Поле пароля з кнопкою «показати». Введений наосліп пароль — головна причина
 * помилок при зміні: людина не бачить ні розкладки, ні випадкового Caps Lock.
 *
 * Приймає ті самі властивості, що й звичайний Input, тому підставляється
 * замість нього без інших змін у формі.
 */
export default function PasswordInput({ className = "", ...props }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                type={isVisible ? "text" : "password"}
                // pr-12 — щоб текст не заповзав під кнопку.
                className={`pr-12 ${className}`}
            />

            <button
                type="button"
                onClick={() => setIsVisible((visible) => !visible)}
                // tabIndex={-1} — Tab має вести з поля одразу на кнопку форми,
                // а не спотикатись об цей перемикач.
                tabIndex={-1}
                aria-label={isVisible ? "Сховати пароль" : "Показати пароль"}
                title={isVisible ? "Сховати пароль" : "Показати пароль"}
                className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-button text-brand-gothic transition-colors hover:bg-white hover:text-brand-madison"
            >
                {isVisible ? (
                    <RxEyeClosed className="size-5" />
                ) : (
                    <RxEyeOpen className="size-5" />
                )}
            </button>
        </div>
    );
}
