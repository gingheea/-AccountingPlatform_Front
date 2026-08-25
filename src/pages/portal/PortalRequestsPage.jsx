"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import { RxCross2 } from "react-icons/rx";
import { getMyClientRequests, getPortalMe } from "../../services/portalService";
import Pagination from "../../components/ui/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../services/paging";
import { ClientRequestForm } from "../../components/shared/ClientRequestForm";

import { statusClass, statusLabel, typeLabel } from "../../constants/requests";

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
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [me, setMe] = useState(null);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

    const loadRequests = useCallback(async () => {
        try {
            setIsLoading(true);

            // The server already sorts, newest first. Sorting here is wrong:
            // we only hold one page, so the order would come out "right"
            // within the page but wrong across the whole list.
            const result = await getMyClientRequests({ page, pageSize });

            setRequests(result.items);
            setTotal(result.total);
        } catch (error) {
            console.error("Failed to load portal requests:", error);
            toast.error("Не вдалося завантажити ваші заявки.");
        } finally {
            setIsLoading(false);
        }
    }, [page, pageSize]);

    useEffect(() => {
        loadRequests();

        // Name and email are prefilled so the client does not type them twice.
        getPortalMe()
            .then(setMe)
            .catch((error) => console.error("Failed to load portal profile:", error));
    }, [loadRequests]);

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div>
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
                    </div>

                    <Button
                        onClick={() => setIsFormOpen(true)}
                        className="w-fit rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                    >
                        Нова заявка
                    </Button>
                </div>
            </section>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-ink/40 px-4 py-8">
                    <div className="w-full max-w-2xl rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                                    Requests
                                </p>

                                <h3 className="font-heading text-3xl font-bold text-brand-ink">
                                    Нова заявка
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                            >
                                <RxCross2 className="size-5" />
                            </button>
                        </div>

                        <ClientRequestForm
                            compact
                            initialContact={{ fullName: me?.fullName, email: me?.email }}
                            onCreated={() => {
                                setIsFormOpen(false);
                                loadRequests();
                            }}
                        />
                    </div>
                </div>
            )}

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
                                                {typeLabel(request.requestType)}
                                            </span>
                                    </td>

                                    <td className="px-5 py-5">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                                                    request.status,
                                                )}`}
                                            >
                                                {statusLabel(request.status)}
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
        </div>
    );
}