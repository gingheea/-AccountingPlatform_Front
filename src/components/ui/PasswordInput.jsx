"use client";

import { useState } from "react";
import { Input } from "@relume_io/relume-ui";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

/**
 * A password field with a reveal button. Typing blind is the main cause of
 * failed password changes: you see neither the layout nor a stray Caps Lock.
 *
 * Takes the same props as a plain Input, so it drops in as a replacement
 * without any other change to the form.
 */
export default function PasswordInput({ className = "", ...props }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                type={isVisible ? "text" : "password"}
                // pr-12 keeps the text from sliding under the button.
                className={`pr-12 ${className}`}
            />

            <button
                type="button"
                onClick={() => setIsVisible((visible) => !visible)}
                // tabIndex={-1}: Tab should go from the field straight to the submit button
                // rather than stumble over this toggle.
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
