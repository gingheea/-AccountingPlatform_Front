"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getAllClientRequests } from "../../services/clientRequestsService";
import { getServices } from "../../services/servicesService";
import { getPricingPackages } from "../../services/pricingPackagesService";
import RequestStatusBadge from "../../components/admin/requests/RequestStatusBadge";
import RequestTypeBadge from "../../components/admin/requests/RequestTypeBadge";
import {
    REQUEST_STATUS,
    isActiveRequest,
    normalizeStatus,
} from "../../constants/requests";

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

export default function DashboardPage() {
    const [requests, setRequests] = useState([]);
    const [services, setServices] = useState([]);
    const [pricingPackages, setPricingPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                setIsLoading(true);

                const [requestsData, servicesData, packagesData] =
                    await Promise.all([
                        getAllClientRequests(),
                        getServices(),
                        getPricingPackages(),
                    ]);

                setRequests(requestsData);
                setServices(servicesData);
                setPricingPackages(packagesData);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
                toast.error("Не вдалося завантажити статистику.");
            } finally {
                setIsLoading(false);
            }
        }

        loadDashboardData();
    }, []);

    const stats = useMemo(() => {
        const normalizedRequests = requests.map((request) => ({
            ...request,
            normalizedStatus: normalizeStatus(request.status),
        }));

        return {
            totalRequests: requests.length,
            newRequests: normalizedRequests.filter(
                (request) => request.normalizedStatus === REQUEST_STATUS.New
            ).length,
            inProgressRequests: normalizedRequests.filter(
                (request) => request.normalizedStatus === REQUEST_STATUS.InProgress
            ).length,
            waitingRequests: normalizedRequests.filter(
                (request) => request.normalizedStatus === REQUEST_STATUS.WaitingForClient
            ).length,
            completedRequests: normalizedRequests.filter(
                (request) => request.normalizedStatus === REQUEST_STATUS.Completed
            ).length,
            rejectedRequests: normalizedRequests.filter(
                (request) => request.normalizedStatus === REQUEST_STATUS.Rejected
            ).length,
            activeServices: services.filter((service) => service.isActive).length,
            totalServices: services.length,
            activePackages: pricingPackages.filter((item) => item.isActive).length,
            totalPackages: pricingPackages.length,
        };
    }, [requests, services, pricingPackages]);

    // Completed and rejected ones are left out: the dashboard shows what still
    // needs attention, not the whole archive.
    const latestRequests = useMemo(() => {
        return [...requests]
            .filter((request) => isActiveRequest(request.status))
            .sort(
                (a, b) =>
                    new Date(b.createdAtUtc).getTime() -
                    new Date(a.createdAtUtc).getTime()
            )
            .slice(0, 5);
    }, [requests]);

    return (
        <section>
            <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Dashboard
                </p>

                <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                    Огляд адмін-панелі
                </h1>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Коротка статистика по заявках, послугах і тарифних пакетах.
                </p>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження статистики...</p>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Total requests"
                            value={stats.totalRequests}
                            helper="Усі заявки клієнтів"
                        />

                        <StatCard
                            label="New requests"
                            value={stats.newRequests}
                            helper="Нові заявки для обробки"
                            accent
                        />

                        <StatCard
                            label="In progress"
                            value={stats.inProgressRequests}
                            helper="Заявки в роботі"
                        />

                        <StatCard
                            label="Completed"
                            value={stats.completedRequests}
                            helper="Завершені заявки"
                        />
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        <StatCard
                            label="Services"
                            value={`${stats.activeServices}/${stats.totalServices}`}
                            helper="Активні / всі послуги"
                        />

                        <StatCard
                            label="Pricing packages"
                            value={`${stats.activePackages}/${stats.totalPackages}`}
                            helper="Активні / всі пакети"
                        />

                        <StatCard
                            label="Waiting / Rejected"
                            value={`${stats.waitingRequests}/${stats.rejectedRequests}`}
                            helper="Очікує клієнта / відхилені"
                        />
                    </div>

                    <div className="mt-8 overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
                        <div className="border-b border-brand-border bg-brand-pampas px-6 py-5">
                            <h2 className="font-heading text-2xl font-bold text-brand-ink">
                                Заявки в роботі
                            </h2>

                            <p className="mt-1 text-sm text-brand-muted">
                                Нові та незавершені. Відхилені й завершені сюди не потрапляють.
                            </p>
                        </div>

                        {latestRequests.length === 0 ? (
                            <div className="p-8">
                                <p className="text-brand-muted">
                                    Заявок поки немає.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] text-left">
                                    <thead className="border-b border-brand-border">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-brand-ink">
                                            Клієнт
                                        </th>
                                        <th className="px-6 py-4 text-sm font-semibold text-brand-ink">
                                            Тип
                                        </th>
                                        <th className="px-6 py-4 text-sm font-semibold text-brand-ink">
                                            Статус
                                        </th>
                                        <th className="px-6 py-4 text-sm font-semibold text-brand-ink">
                                            Дата
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {latestRequests.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-b border-brand-border last:border-b-0"
                                        >
                                            <td className="px-6 py-5">
                                                <p className="font-semibold text-brand-ink">
                                                    {request.fullName}
                                                </p>
                                                <p className="mt-1 text-sm text-brand-muted">
                                                    {request.email}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5">
                                                <RequestTypeBadge
                                                    requestType={request.requestType}
                                                />
                                            </td>

                                            <td className="px-6 py-5">
                                                <RequestStatusBadge
                                                    status={request.status}
                                                />
                                            </td>

                                            <td className="px-6 py-5 text-sm text-brand-muted">
                                                {formatDate(request.createdAtUtc)}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}

function StatCard({ label, value, helper, accent = false }) {
    return (
        <div
            className={`rounded-card border p-6 shadow-soft ${
                accent
                    ? "border-white/15 bg-brand-madison text-white"
                    : "border-brand-border bg-white"
            }`}
        >
            <p
                className={`text-sm font-semibold ${
                    accent ? "text-white/65" : "text-brand-muted"
                }`}
            >
                {label}
            </p>

            <p
                className={`mt-3 font-heading text-4xl font-bold ${
                    accent ? "text-white" : "text-brand-madison"
                }`}
            >
                {value}
            </p>

            <p
                className={`mt-2 text-sm leading-6 ${
                    accent ? "text-white/70" : "text-brand-muted"
                }`}
            >
                {helper}
            </p>
        </div>
    );
}