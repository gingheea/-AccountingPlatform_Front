"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyClientRequests } from "../../services/portalService";

const statusLabels = {
    0: "Нова",
    1: "В роботі",
    2: "Очікує відповіді",
    3: "Завершена",
    4: "Відхилена",
};

const statusClasses = {
    0: "bg-blue-50 text-blue-700",
    1: "bg-yellow-50 text-yellow-700",
    2: "bg-purple-50 text-purple-700",
    3: "bg-green-50 text-green-700",
    4: "bg-red-50 text-red-700",
};

const typeLabels = {
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

export default function PortalRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadRequests() {
            try {
                setIsLoading(true);

                const data = await getMyClientRequests();

                setRequests(
                    [...data].sort(
                        (a, b) =>
                            new Date(b.createdAtUtc) - new Date(a.createdAtUtc)
                    )
                );
            } catch (error) {
                console.error("Failed to load portal requests:", error);
                toast.error("Не вдалося завантажити ваші заявки.");
            } finally {
                setIsLoading(false);
            }
        }

        loadRequests();
    }, []);

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Requests
                </p>

                <h2 className="font-heading text-4xl font-bold text-brand-ink">
                    Мої заявки
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Тут відображаються заявки, які привʼязані до вашого
                    клієнтського акаунта.
                </p>
            </section>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження заявок...</p>
                </div>
            ) : requests.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Заявок ще немає
                    </h3>

                    <p className="mt-2 text-brand-muted">
                        Коли заявка буде створена з вашого акаунта або бухгалтер
                        привʼяже її до вас, вона зʼявиться тут.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-brand-border">
                            <thead className="bg-brand-pampas">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Заявка
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Тип
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Статус
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Дата
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-brand-border bg-white">
                            {requests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="transition hover:bg-brand-pampas/40"
                                >
                                    <td className="px-5 py-5">
                                        <p className="font-semibold text-brand-ink">
                                            {request.fullName}
                                        </p>

                                        <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-brand-muted">
                                            {request.message || "Без повідомлення"}
                                        </p>
                                    </td>

                                    <td className="px-5 py-5">
                                            <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-madison">
                                                {typeLabels[request.requestType] ||
                                                    "Невідомо"}
                                            </span>
                                    </td>

                                    <td className="px-5 py-5">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                    statusClasses[request.status] ||
                                                    "bg-brand-soft text-brand-muted"
                                                }`}
                                            >
                                                {statusLabels[request.status] ||
                                                    "Невідомо"}
                                            </span>
                                    </td>

                                    <td className="px-5 py-5 text-sm text-brand-muted">
                                        {formatDate(request.createdAtUtc)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}