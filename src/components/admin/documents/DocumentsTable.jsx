"use client";

import React from "react";
import { RxDownload, RxTrash } from "react-icons/rx";
import {
    DOCUMENT_STATUSES,
    DOCUMENT_STATUS_CLASSES,
    categoryLabel,
    directionLabel,
    formatDocumentDate,
    formatFileSize,
    statusLabel,
} from "../../../constants/documents";

export default function DocumentsTable({
                                           documents,
                                           usersById,
                                           onDownload,
                                           onChangeStatus,
                                           onDelete,
                                           downloadingId,
                                       }) {
    if (documents.length === 0) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                <h3 className="font-heading text-2xl font-bold text-brand-ink">
                    Документів не знайдено
                </h3>

                <p className="mt-2 text-brand-muted">
                    Спробуйте змінити фільтри або завантажте перший документ для клієнта.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-brand-border">
                    <thead className="bg-brand-pampas">
                    <tr>
                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Документ
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Клієнт
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Категорія
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Статус
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Дата
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Дії
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-brand-border bg-white">
                    {documents.map((document) => {
                        const user = usersById[document.userId];

                        return (
                            <tr key={document.id} className="transition hover:bg-brand-pampas/40">
                                <td className="px-5 py-5">
                                    <p className="font-semibold text-brand-ink">
                                        {document.title}
                                    </p>

                                    <p className="mt-1 text-sm text-brand-muted">
                                        {document.fileName} · {formatFileSize(document.sizeBytes)}
                                        {" · "}
                                        {directionLabel(document.direction)}
                                    </p>

                                    {document.note && (
                                        <p className="mt-2 max-w-md text-sm leading-6 text-brand-muted">
                                            {document.note}
                                        </p>
                                    )}
                                </td>

                                <td className="px-5 py-5">
                                    <p className="font-semibold text-brand-ink">
                                        {user?.fullName || "—"}
                                    </p>

                                    <p className="mt-1 text-sm text-brand-muted">
                                        {user?.email || document.userId}
                                    </p>
                                </td>

                                <td className="px-5 py-5">
                                    <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-madison">
                                        {categoryLabel(document.category)}
                                    </span>
                                </td>

                                <td className="px-5 py-5">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            DOCUMENT_STATUS_CLASSES[document.status] ||
                                            "bg-brand-soft text-brand-muted"
                                        }`}
                                    >
                                        {statusLabel(document.status)}
                                    </span>

                                    <select
                                        value=""
                                        onChange={(event) => {
                                            if (event.target.value === "") return;

                                            onChangeStatus(document, Number(event.target.value));
                                            event.target.value = "";
                                        }}
                                        className="mt-2 block min-h-9 w-full rounded-button border border-brand-border bg-white px-2 text-xs text-brand-ink outline-none focus:border-brand-madison"
                                    >
                                        <option value="">Змінити статус…</option>

                                        {DOCUMENT_STATUSES.filter(
                                            (status) =>
                                                status.value !== 0 && status.value !== document.status,
                                        ).map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="px-5 py-5 text-sm text-brand-muted">
                                    {formatDocumentDate(document.createdAtUtc)}
                                </td>

                                <td className="px-5 py-5">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onDownload(document)}
                                            disabled={downloadingId === document.id}
                                            className="inline-flex items-center gap-2 rounded-button border border-brand-border px-3 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-pampas disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <RxDownload className="size-4" />
                                            {downloadingId === document.id ? "…" : "Файл"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDelete(document)}
                                            className="inline-flex items-center gap-2 rounded-button border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                                        >
                                            <RxTrash className="size-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
