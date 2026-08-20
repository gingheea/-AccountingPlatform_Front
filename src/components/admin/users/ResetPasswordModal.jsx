"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function ResetPasswordModal({
                                               isOpen,
                                               user,
                                               onClose,
                                               onSubmit,
                                               isSubmitting,
                                           }) {
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            setNewPassword("");
        }
    }, [isOpen]);

    if (!isOpen || !user) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(user.id, newPassword);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="w-full max-w-xl rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Reset password
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            Новий пароль
                        </h2>

                        <p className="mt-2 text-brand-muted">
                            Для користувача:{" "}
                            <span className="font-semibold text-brand-ink">
                                {user.email}
                            </span>
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Новий пароль *
                        </label>

                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            required
                            minLength={8}
                            placeholder="NewPassword123"
                            className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                        />

                        <p className="mt-2 text-xs leading-5 text-brand-muted">
                            Щонайменше 8 символів, велика й мала літери та цифра.
                            Спецсимвол не обов'язковий.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="rounded-button border border-brand-border bg-white px-5 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                        >
                            Скасувати
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-button bg-brand-madison px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Збереження..." : "Змінити пароль"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}