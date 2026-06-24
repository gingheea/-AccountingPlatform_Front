"use client";

import React from "react";

const requestStatusLabels = {
    0: "Нова",
    1: "В роботі",
    2: "Очікує відповіді",
    3: "Завершена",
    4: "Відхилена",
};

const requestStatusClasses = {
    0: "bg-blue-50 text-blue-700",
    1: "bg-yellow-50 text-yellow-700",
    2: "bg-purple-50 text-purple-700",
    3: "bg-green-50 text-green-700",
    4: "bg-red-50 text-red-700",
};

const requestTypeLabels = {
    0: "Послуга",
    1: "Пакет",
    2: "Консультація",
};

function formatDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

function getRequestSubject(request, servicesMap, packagesMap) {
    if (request.serviceId) {
        const service = servicesMap.get(request.serviceId);

        return service?.name ?? "Послуга";
    }

    if (request.pricingPackageId) {
        const pricingPackage = packagesMap.get(request.pricingPackageId);

        return pricingPackage?.name ?? "Пакет";
    }

    return "Загальна консультація";
}

export default function RequestsTable({
                                          requests,
                                          servicesMap,
                                          packagesMap,
                                          usersMap,
                                          onView,
                                          onAssignUser,
                                          onUnassignUser,
                                          isSubmitting,
                                      }) {
    if (!requests.length) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                <p className="font-heading text-2xl font-semibold text-brand-ink">
                    Заявок ще немає
                </p>
                <p className="mt-2 text-brand-muted">
                    Коли клієнти залишать заявку, вона зʼявиться тут.
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
                            Клієнт
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Контакти
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Запит
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                            Акаунт
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
                    {requests.map((request) => {
                        const assignedUser = request.userId
                            ? usersMap?.get(request.userId)
                            : null;

                        const subject = getRequestSubject(
                            request,
                            servicesMap,
                            packagesMap
                        );

                        return (
                            <tr
                                key={request.id}
                                className="align-top transition hover:bg-brand-pampas/40"
                            >
                                <td className="px-5 py-5">
                                    <div>
                                        <p className="font-semibold text-brand-ink">
                                            {request.fullName}
                                        </p>

                                        {request.message && (
                                            <p className="mt-2 line-clamp-2 max-w-xs text-sm leading-6 text-brand-muted">
                                                {request.message}
                                            </p>
                                        )}
                                    </div>
                                </td>

                                <td className="px-5 py-5">
                                    <div className="space-y-1 text-sm">
                                        <p className="font-medium text-brand-ink">
                                            {request.email}
                                        </p>

                                        <p className="text-brand-muted">
                                            {request.phone || "—"}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-5 py-5">
                                    <div className="space-y-2">
                                            <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-madison">
                                                {requestTypeLabels[request.requestType] ??
                                                    "Невідомо"}
                                            </span>

                                        <p className="text-sm font-medium text-brand-ink">
                                            {subject}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-5 py-5">
                                    {request.userId ? (
                                        <div className="space-y-1">
                                                <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                    Привʼязано
                                                </span>

                                            {assignedUser ? (
                                                <>
                                                    <p className="text-sm font-semibold text-brand-ink">
                                                        {assignedUser.fullName ||
                                                            "Без імені"}
                                                    </p>

                                                    <p className="text-xs text-brand-muted">
                                                        {assignedUser.email}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-xs text-brand-muted">
                                                    User не знайдено
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                                                    Не привʼязано
                                                </span>

                                            <p className="text-xs text-brand-muted">
                                                Не видно в порталі
                                            </p>
                                        </div>
                                    )}
                                </td>

                                <td className="px-5 py-5">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                requestStatusClasses[request.status] ??
                                                "bg-brand-soft text-brand-muted"
                                            }`}
                                        >
                                            {requestStatusLabels[request.status] ??
                                                "Невідомо"}
                                        </span>
                                </td>

                                <td className="px-5 py-5 text-sm text-brand-muted">
                                    {formatDate(request.createdAtUtc)}
                                </td>

                                <td className="px-5 py-5">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onView(request)}
                                            disabled={isSubmitting}
                                            className="rounded-button border border-brand-border px-3 py-2 text-xs font-semibold text-brand-ink transition hover:bg-brand-pampas disabled:opacity-60"
                                        >
                                            Деталі
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onAssignUser(request)}
                                            disabled={isSubmitting}
                                            className="rounded-button bg-brand-madison px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-madisonDark disabled:opacity-60"
                                        >
                                            {request.userId
                                                ? "Змінити клієнта"
                                                : "Привʼязати"}
                                        </button>

                                        {request.userId && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onUnassignUser(request)
                                                }
                                                disabled={isSubmitting}
                                                className="rounded-button border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                                            >
                                                Відвʼязати
                                            </button>
                                        )}
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