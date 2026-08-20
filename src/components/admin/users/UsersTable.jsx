"use client";

import React from "react";
import { RxPencil1, RxReload, RxLockClosed, RxTrash } from "react-icons/rx";
import UserRolesBadge from "./UserRolesBadge";

function formatDate(date) {
    if (!date) return "—";

    return new Intl.DateTimeFormat("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export default function UsersTable({
                                       users,
                                       onEdit,
                                       onToggleActive,
                                       onResetPassword,
                                       onDelete,
                                       currentUserEmail,
                                       isFiltered = false,
                                   }) {
    if (users.length === 0) {
        // Порожньо через фільтр і порожньо взагалі — різні речі. «Створіть
        // першого користувача» під час пошуку виглядало б як помилка.
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                <h3 className="font-heading text-2xl font-bold text-brand-ink">
                    {isFiltered ? "Нічого не знайдено" : "Користувачів ще немає"}
                </h3>

                <p className="mt-3 text-brand-muted">
                    {isFiltered
                        ? "Спробуйте змінити запит або скинути фільтр статусу."
                        : "Створіть першого користувача для доступу до системи."}
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">
                    <thead className="border-b border-brand-border bg-brand-pampas">
                    <tr>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Користувач
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Tax ID
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Ролі
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Статус
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Створено
                        </th>
                        <th className="px-5 py-4 text-right text-sm font-semibold text-brand-ink">
                            Дії
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b border-brand-border last:border-b-0"
                        >
                            <td className="px-5 py-5">
                                <p className="font-semibold text-brand-ink">
                                    {user.fullName || "Без імені"}
                                </p>
                                <p className="mt-1 text-sm text-brand-muted">
                                    {user.email}
                                </p>
                            </td>

                            <td className="px-5 py-5 text-sm text-brand-muted">
                                {user.taxId || "—"}
                            </td>

                            <td className="px-5 py-5">
                                <UserRolesBadge roles={user.roles} />
                            </td>

                            <td className="px-5 py-5">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            user.isActive
                                                ? "bg-brand-pampas text-brand-madison"
                                                : "bg-brand-soft text-brand-gothic"
                                        }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                            </td>

                            <td className="px-5 py-5 text-sm text-brand-muted">
                                {formatDate(user.createdAtUtc)}
                            </td>

                            <td className="px-5 py-5">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(user)}
                                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                                    >
                                        <RxPencil1 className="size-4" />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onResetPassword(user)}
                                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                                    >
                                        <RxLockClosed className="size-4" />
                                        Password
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onToggleActive(user)}
                                        className={`inline-flex items-center gap-2 rounded-button border px-3 py-2 text-sm font-semibold transition-colors ${
                                            user.isActive
                                                ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                                : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                        }`}
                                    >
                                        <RxReload className="size-4" />
                                        {user.isActive ? "Deactivate" : "Activate"}
                                    </button>

                                    {/* Себе видалити не можна — інакше легко
                                        лишитись без доступу до адмінки. Це саме
                                        правило продубльоване на сервері. */}
                                    {user.email !== currentUserEmail && (
                                        <button
                                            type="button"
                                            onClick={() => onDelete(user)}
                                            className="inline-flex items-center gap-2 rounded-button border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                                        >
                                            <RxTrash className="size-4" />
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}