"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getMyClientRequests, getPortalMe } from "../../services/portalService";
import { getMyDocuments } from "../../services/documentsService";
import { getMySubscriptions } from "../../services/subscriptionsService";
import { MAX_PAGE_SIZE } from "../../services/paging";
import {
    SUBSCRIPTION_STATUS,
    subscriptionTitle,
} from "../../constants/subscriptions";

import {
    REQUEST_STATUS,
    isActiveRequest,
    normalizeStatus,
    statusLabel,
} from "../../constants/requests";

export default function PortalDashboardPage() {
    const [me, setMe] = useState(null);
    const [requests, setRequests] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const activeSubscriptions = useMemo(
        () => subscriptions.filter((s) => s.status === SUBSCRIPTION_STATUS.Active),
        [subscriptions],
    );

    const sortedRequests = useMemo(() => {
        return [...requests].sort(
            (a, b) => new Date(b.createdAtUtc) - new Date(a.createdAtUtc)
        );
    }, [requests]);

    const latestRequest = sortedRequests[0];

    const activeRequestsCount = useMemo(() => {
        return requests.filter((request) => isActiveRequest(request.status)).length;
    }, [requests]);

    const completedRequestsCount = useMemo(() => {
        return requests.filter(
            (request) => normalizeStatus(request.status) === REQUEST_STATUS.Completed,
        ).length;
    }, [requests]);

    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true);

                const [meData, requestsData, documentsData, subscriptionsData] =
                    await Promise.all([
                        getPortalMe(),
                        getMyClientRequests({ pageSize: MAX_PAGE_SIZE }),
                        getMyDocuments({ pageSize: MAX_PAGE_SIZE }),
                        getMySubscriptions({ pageSize: MAX_PAGE_SIZE }),
                    ]);

                setMe(meData);

                // Списки тепер приходять як { items, total } — на огляді нам
                // потрібні самі записи, щоб порахувати їх за статусами.
                setRequests(requestsData.items);
                setDocuments(documentsData.items);
                setSubscriptions(subscriptionsData.items);
            } catch (error) {
                console.error("Failed to load portal dashboard:", error);
                toast.error("Не вдалося завантажити портал.");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">Завантаження порталу...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Dashboard
                </p>

                <h2 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                    Вітаємо, {me?.fullName || me?.email}
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Тут зібрані ваші заявки, документи та основна інформація для
                    роботи з бухгалтером.
                </p>
            </section>

            {/* Найголовніше для клієнта — за яким пакетом його ведуть. */}
            <section className="rounded-card border border-brand-border bg-brand-madison p-6 text-white shadow-soft">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-tan">
                    Ваше обслуговування
                </p>

                {activeSubscriptions.length === 0 ? (
                    <>
                        <h3 className="mt-3 font-heading text-2xl font-bold">
                            Поки що нічого не підключено
                        </h3>

                        <p className="mt-2 leading-7 text-white/75">
                            Коли бухгалтер візьме вас на супровід, тут зʼявиться ваш пакет.
                        </p>
                    </>
                ) : (
                    <>
                        <h3 className="mt-3 font-heading text-2xl font-bold">
                            {activeSubscriptions.map(subscriptionTitle).join(", ")}
                        </h3>

                        <p className="mt-2 leading-7 text-white/75">
                            {activeSubscriptions.length === 1
                                ? "Активний пакет супроводу."
                                : `Активних послуг: ${activeSubscriptions.length}.`}
                        </p>
                    </>
                )}

                <Link
                    to="/portal/services"
                    className="mt-5 inline-flex rounded-button bg-white px-4 py-2 text-sm font-semibold text-brand-madison transition hover:bg-brand-pampas"
                >
                    Мої послуги
                </Link>
            </section>

            <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Активні заявки
                    </p>

                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        {activeRequestsCount}
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Завершені заявки
                    </p>

                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        {completedRequestsCount}
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Документи
                    </p>

                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        {documents.length}
                    </p>

                    <p className="mt-2 text-sm text-brand-muted">
                        {documents.filter((document) => document.direction === 1).length} від
                        бухгалтера
                    </p>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-brand-ink">
                                Остання заявка
                            </h3>

                            <p className="mt-2 text-sm text-brand-muted">
                                Останній запит, який привʼязаний до вашого акаунта.
                            </p>
                        </div>

                        <Link
                            to="/portal/requests"
                            className="rounded-button border border-brand-border px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-pampas"
                        >
                            Усі заявки
                        </Link>
                    </div>

                    {latestRequest ? (
                        <div className="mt-5 rounded-card bg-brand-pampas p-5">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <p className="font-semibold text-brand-ink">
                                        {latestRequest.fullName}
                                    </p>

                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-brand-muted">
                                        {latestRequest.message || "Без повідомлення"}
                                    </p>
                                </div>

                                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-madison">
                                    {statusLabel(latestRequest.status)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-5 text-brand-muted">
                            У вас ще немає привʼязаних заявок.
                        </p>
                    )}
                </div>

                <div className="rounded-card border border-brand-border bg-brand-madison p-6 text-white shadow-soft">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-tan">
                        Documents
                    </p>

                    <h3 className="mt-3 font-heading text-2xl font-bold">
                        Документи клієнта
                    </h3>

                    <p className="mt-3 leading-7 text-white/75">
                        Тут будуть файли, які клієнт передає бухгалтеру, і файли,
                        які бухгалтер віддає клієнту: звітність, рахунки, акти,
                        договори.
                    </p>

                    <Link
                        to="/portal/documents"
                        className="mt-5 inline-flex rounded-button bg-white px-4 py-2 text-sm font-semibold text-brand-madison transition hover:bg-brand-pampas"
                    >
                        Перейти до документів
                    </Link>
                </div>
            </section>
        </div>
    );
}