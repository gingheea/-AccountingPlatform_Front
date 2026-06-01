"use client";

import React from "react";
import { RxPencil1, RxTrash } from "react-icons/rx";

export default function ServicesTable({ services, onEdit, onDelete, onToggleActive }) {
    if (services.length === 0) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                <h3 className="font-heading text-2xl font-bold text-brand-ink">
                    Послуги ще не додані
                </h3>

                <p className="mt-3 text-brand-muted">
                    Створіть першу послугу, щоб вона зʼявилася на сайті.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left">
                    <thead className="border-b border-brand-border bg-brand-pampas">
                    <tr>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Назва
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Ціна
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Теги
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Статус
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Порядок
                        </th>
                        <th className="px-5 py-4 text-right text-sm font-semibold text-brand-ink">
                            Дії
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {services.map((service) => (
                        <tr
                            key={service.id}
                            className="border-b border-brand-border last:border-b-0"
                        >
                            <td className="px-5 py-5">
                                <div>
                                    <p className="font-semibold text-brand-ink">
                                        {service.name}
                                    </p>

                                    <p className="mt-1 line-clamp-2 max-w-md text-sm leading-6 text-brand-muted">
                                        {service.description || "Без опису"}
                                    </p>
                                </div>
                            </td>

                            <td className="px-5 py-5">
                                <p className="font-semibold text-brand-ink">
                                    {service.price}
                                </p>

                                {service.priceLabel && (
                                    <p className="mt-1 text-sm text-brand-muted">
                                        {service.priceLabel}
                                    </p>
                                )}
                            </td>

                            <td className="px-5 py-5">
                                <div className="flex max-w-xs flex-wrap gap-2">
                                    {service.tags?.length > 0 ? (
                                        service.tags.map((tag) => (
                                            <span
                                                key={`${service.id}-${tag}`}
                                                className="rounded-full bg-brand-pampas px-3 py-1 text-xs font-semibold text-brand-madison"
                                            >
                                                    {tag}
                                                </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-brand-muted">
                                                —
                                            </span>
                                    )}
                                </div>
                            </td>

                            <td className="px-5 py-5">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            service.isActive
                                                ? "bg-brand-pampas text-brand-madison"
                                                : "bg-brand-soft text-brand-gothic"
                                        }`}
                                    >
                                        {service.isActive ? "Active" : "Inactive"}
                                    </span>
                            </td>

                            <td className="px-5 py-5 text-brand-muted">
                                {service.sortOrder}
                            </td>

                            <td className="px-5 py-5">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(service)}
                                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                                    >
                                        <RxPencil1 className="size-4" />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onToggleActive(service)}
                                        className={`inline-flex items-center gap-2 rounded-button border px-3 py-2 text-sm font-semibold transition-colors ${
                                            service.isActive
                                                ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                                : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                        }`}
                                    >
                                        {service.isActive ? "Deactivate" : "Activate"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDelete(service)}
                                        className="inline-flex items-center gap-2 rounded-button border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
                                    >
                                        <RxTrash className="size-4" />
                                        Delete
                                    </button>
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