"use client";

import React from "react";
import { RxEyeOpen } from "react-icons/rx";
import RequestStatusBadge from "./RequestStatusBadge";
import RequestTypeBadge from "./RequestTypeBadge";

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

function getSelectedOption(request, servicesMap, packagesMap) {
    if (request.serviceId) {
        return servicesMap.get(request.serviceId)?.name ?? "Service selected";
    }

    if (request.pricingPackageId) {
        return packagesMap.get(request.pricingPackageId)?.name ?? "Package selected";
    }

    return "General consultation";
}

export default function RequestsTable({
                                          requests,
                                          servicesMap,
                                          packagesMap,
                                          onView,
                                      }) {
    if (requests.length === 0) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                <h3 className="font-heading text-2xl font-bold text-brand-ink">
                    Заявок ще немає
                </h3>

                <p className="mt-3 text-brand-muted">
                    Коли клієнти надсилатимуть форму, заявки зʼявляться тут.
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
                            Клієнт
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Тип
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Вибір
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Статус
                        </th>
                        <th className="px-5 py-4 text-sm font-semibold text-brand-ink">
                            Дата
                        </th>
                        <th className="px-5 py-4 text-right text-sm font-semibold text-brand-ink">
                            Дії
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {requests.map((request) => (
                        <tr
                            key={request.id}
                            className="border-b border-brand-border last:border-b-0"
                        >
                            <td className="px-5 py-5">
                                <p className="font-semibold text-brand-ink">
                                    {request.fullName}
                                </p>
                                <p className="mt-1 text-sm text-brand-muted">
                                    {request.email}
                                </p>
                                {request.phone && (
                                    <p className="mt-1 text-sm text-brand-muted">
                                        {request.phone}
                                    </p>
                                )}
                            </td>

                            <td className="px-5 py-5">
                                <RequestTypeBadge requestType={request.requestType} />
                            </td>

                            <td className="px-5 py-5">
                                <p className="max-w-xs font-medium text-brand-ink">
                                    {getSelectedOption(
                                        request,
                                        servicesMap,
                                        packagesMap
                                    )}
                                </p>
                            </td>

                            <td className="px-5 py-5">
                                <RequestStatusBadge status={request.status} />
                            </td>

                            <td className="px-5 py-5 text-sm text-brand-muted">
                                {formatDate(request.createdAtUtc)}
                            </td>

                            <td className="px-5 py-5">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => onView(request)}
                                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                                    >
                                        <RxEyeOpen className="size-4" />
                                        View
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