"use client";

import SelectField from "../../ui/SelectField";
import React, { useEffect, useMemo, useState } from "react";

export default function AssignRequestUserModal({
                                                   isOpen,
                                                   request,
                                                   users,
                                                   onClose,
                                                   onAssign,
                                                   isSubmitting,
                                               }) {
    const [selectedUserId, setSelectedUserId] = useState("");
    const [search, setSearch] = useState("");
    const [localError, setLocalError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        setSelectedUserId(request?.userId ?? "");
        setSearch("");
        setLocalError("");
    }, [isOpen, request]);

    const filteredUsers = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        const activeUsers = users.filter((user) => user.isActive);

        if (!normalizedSearch) {
            return activeUsers;
        }

        return activeUsers.filter((user) => {
            const fullName = user.fullName?.toLowerCase() ?? "";
            const email = user.email?.toLowerCase() ?? "";
            const taxId = user.taxId?.toLowerCase() ?? "";

            return (
                fullName.includes(normalizedSearch) ||
                email.includes(normalizedSearch) ||
                taxId.includes(normalizedSearch)
            );
        });
    }, [users, search]);

    if (!isOpen || !request) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedUserId) {
            setLocalError("Оберіть клієнта.");
            return;
        }

        try {
            setLocalError("");

            await onAssign(request.id, selectedUserId);

            onClose();
        } catch {
            setLocalError("Не вдалося привʼязати заявку до клієнта.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-card border border-brand-border bg-white p-6 shadow-soft">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Assignment
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            Привʼязати заявку до клієнта
                        </h2>

                        <p className="mt-3 leading-7 text-brand-muted">
                            {request.fullName} · {request.email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-button border border-brand-border px-3 py-2 text-sm font-medium text-brand-muted transition hover:bg-brand-pampas disabled:opacity-60"
                    >
                        Закрити
                    </button>
                </div>

                {localError && (
                    <div className="mb-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {localError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Пошук клієнта
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Імʼя, email або ІПН"
                            disabled={isSubmitting}
                            className="w-full rounded-button border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted focus:border-brand-madison"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Клієнт
                        </label>

                        <SelectField
                            value={selectedUserId}
                            onChange={(event) =>
                                setSelectedUserId(event.target.value)
                            }
                            disabled={isSubmitting}
                            className=""
                        >
                            <option value="">Оберіть клієнта</option>

                            {filteredUsers.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {(user.fullName || "Без імені")} · {user.email}
                                    {user.taxId ? ` · ${user.taxId}` : ""}
                                </option>
                            ))}
                        </SelectField>

                        {filteredUsers.length === 0 && (
                            <p className="mt-2 text-sm text-brand-muted">
                                Активних клієнтів не знайдено.
                            </p>
                        )}
                    </div>

                    <div className="rounded-card bg-brand-pampas px-4 py-3 text-sm leading-6 text-brand-muted">
                        Після привʼязки клієнт бачитиме цю заявку у своєму
                        порталі.
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-button border border-brand-border px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-pampas disabled:opacity-60"
                        >
                            Скасувати
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-button bg-brand-madison px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-madisonDark disabled:opacity-60"
                        >
                            {isSubmitting ? "Збереження..." : "Привʼязати"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}