"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import { RxTrash } from "react-icons/rx";
import {
    changeSubscriptionStatus,
    createSubscription,
    deleteSubscription,
    getSubscriptions,
} from "../../services/subscriptionsService";
import { getAllUsers } from "../../services/usersService";
import { getServices } from "../../services/servicesService";
import { getPricingPackages } from "../../services/pricingPackagesService";
import { getApiErrorMessage } from "../../utils/apiError";
import {
    SUBSCRIPTION_STATUS,
    SUBSCRIPTION_STATUS_LABELS,
    formatSubscriptionDate,
    subscriptionKind,
    subscriptionStatusClass,
    subscriptionStatusLabel,
    subscriptionTitle,
} from "../../constants/subscriptions";
import SubscriptionFormModal from "../../components/admin/subscriptions/SubscriptionFormModal";
import ActionMenu from "../../components/ui/ActionMenu";
import SelectField from "../../components/ui/SelectField";
import Pagination from "../../components/ui/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../services/paging";

const filterClass = "min-h-11";

export default function SubscriptionsAdminPage() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filters, setFilters] = useState({ userId: "", status: "" });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

    const usersById = useMemo(
        () => Object.fromEntries(users.map((user) => [user.id, user])),
        [users],
    );

    async function loadSubscriptions() {
        try {
            setIsLoading(true);

            const result = await getSubscriptions({ ...filters, page, pageSize });

            setSubscriptions(result.items);
            setTotal(result.total);
        } catch (error) {
            console.error("Failed to load subscriptions:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося завантажити обслуговування."));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function loadReferences() {
            try {
                const [usersData, servicesData, packagesData] = await Promise.all([
                    getAllUsers(),
                    getServices(),
                    getPricingPackages(),
                ]);

                setUsers(usersData);
                setServices(servicesData);
                setPackages(packagesData);
            } catch (error) {
                console.error("Failed to load references:", error);
            }
        }

        loadReferences();
    }, []);

    useEffect(() => {
        loadSubscriptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, page, pageSize]);

    const handleCreate = async (payload) => {
        try {
            setIsSubmitting(true);

            await createSubscription(payload);

            toast.success("Обслуговування підключено.");
            setIsModalOpen(false);
            await loadSubscriptions();

            return true;
        } catch (error) {
            console.error("Failed to create subscription:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося підключити обслуговування."));

            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStatusChange = async (subscription, status) => {
        try {
            await changeSubscriptionStatus(subscription.id, status);

            toast.success("Статус змінено.");
            await loadSubscriptions();
        } catch (error) {
            console.error("Failed to change subscription status:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося змінити статус."));
        }
    };

    const handleDelete = async (subscription) => {
        const confirmed = window.confirm(
            `Видалити запис «${subscriptionTitle(subscription)}»? Історія обслуговування буде втрачена.`,
        );

        if (!confirmed) return;

        try {
            await deleteSubscription(subscription.id);

            toast.success("Запис видалено.");
            await loadSubscriptions();
        } catch (error) {
            console.error("Failed to delete subscription:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити запис."));
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Subscriptions
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Обслуговування клієнтів
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Які пакети та послуги ви ведете для кожного клієнта. Саме це клієнт
                        бачить у своєму кабінеті.
                    </p>
                </div>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Підключити
                </Button>
            </div>

            <div className="mb-6 rounded-card border border-brand-border bg-white p-5 shadow-soft">
                <div className="grid gap-3 md:grid-cols-2">
                    <SelectField
                        value={filters.userId}
                        onChange={(e) => setFilters((p) => ({ ...p, userId: e.target.value }))}
                        className={filterClass}
                    >
                        <option value="">Усі клієнти</option>

                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullName || user.email}
                            </option>
                        ))}
                    </SelectField>

                    <SelectField
                        value={filters.status}
                        onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
                        className={filterClass}
                    >
                        <option value="">Усі статуси</option>

                        {Object.entries(SUBSCRIPTION_STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </SelectField>
                </div>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження...</p>
                </div>
            ) : subscriptions.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Записів немає
                    </h3>

                    <p className="mt-2 text-brand-muted">
                        Підключіть клієнту пакет — і він одразу побачить це у своєму кабінеті.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-brand-border">
                            <thead className="bg-brand-pampas">
                            <tr>
                                {["Клієнт", "Що обслуговується", "Період", "Статус", "Дії"].map((h) => (
                                    <th
                                        key={h}
                                        className={`px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted ${
                                            h === "Дії" ? "text-right" : "text-left"
                                        }`}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-brand-border bg-white">
                            {subscriptions.map((subscription) => {
                                const user = usersById[subscription.userId];

                                return (
                                    <tr key={subscription.id} className="transition hover:bg-brand-pampas/40">
                                        <td className="px-5 py-5">
                                            <p className="font-semibold text-brand-ink">
                                                {user?.fullName || "—"}
                                            </p>
                                            <p className="mt-1 text-sm text-brand-muted">
                                                {user?.email || subscription.userId}
                                            </p>
                                        </td>

                                        <td className="px-5 py-5">
                                            <p className="font-semibold text-brand-ink">
                                                {subscriptionTitle(subscription)}
                                            </p>
                                            <p className="mt-1 text-sm text-brand-muted">
                                                {subscriptionKind(subscription)}
                                            </p>
                                            {subscription.note && (
                                                <p className="mt-2 max-w-md text-sm leading-6 text-brand-muted">
                                                    {subscription.note}
                                                </p>
                                            )}
                                        </td>

                                        <td className="px-5 py-5 text-sm text-brand-muted">
                                            з {formatSubscriptionDate(subscription.startedAtUtc)}
                                            {subscription.endedAtUtc && (
                                                <> до {formatSubscriptionDate(subscription.endedAtUtc)}</>
                                            )}
                                        </td>

                                        <td className="px-5 py-5">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${subscriptionStatusClass(
                                                    subscription.status,
                                                )}`}
                                            >
                                                {subscriptionStatusLabel(subscription.status)}
                                            </span>

                                            {subscription.status !== SUBSCRIPTION_STATUS.Ended && (
                                                <div className="mt-2">
                                                    <ActionMenu
                                                        label="Змінити"
                                                        items={[
                                                            subscription.status === SUBSCRIPTION_STATUS.Active && {
                                                                label: "На паузу",
                                                                onSelect: () =>
                                                                    handleStatusChange(
                                                                        subscription,
                                                                        SUBSCRIPTION_STATUS.Paused,
                                                                    ),
                                                            },
                                                            subscription.status === SUBSCRIPTION_STATUS.Paused && {
                                                                label: "Поновити",
                                                                onSelect: () =>
                                                                    handleStatusChange(
                                                                        subscription,
                                                                        SUBSCRIPTION_STATUS.Active,
                                                                    ),
                                                            },
                                                            {
                                                                label: "Завершити",
                                                                tone: "danger",
                                                                onSelect: () =>
                                                                    handleStatusChange(
                                                                        subscription,
                                                                        SUBSCRIPTION_STATUS.Ended,
                                                                    ),
                                                            },
                                                        ].filter(Boolean)}
                                                    />
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-5 py-5">
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(subscription)}
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

                    <div className="px-5 pb-5">
                        <Pagination
                            page={page}
                            pageSize={pageSize}
                            total={total}
                            onPageChange={setPage}
                            onPageSizeChange={(size) => {
                                setPage(1);
                                setPageSize(size);
                            }}
                        />
                    </div>
                </div>
            )}

            <SubscriptionFormModal
                isOpen={isModalOpen}
                users={users}
                services={services}
                packages={packages}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}
