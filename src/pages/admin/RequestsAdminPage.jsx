"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    assignClientRequestToUser,
    changeClientRequestAdminNote,
    changeClientRequestStatus,
    completeClientRequest,
    deleteClientRequest,
    getClientRequests,
    rejectClientRequest,
    unassignClientRequestUser,
} from "../../services/clientRequestsService";
import { REQUEST_STATUS } from "../../constants/requests";
import { getApiErrorMessage } from "../../utils/apiError";
import { getServices } from "../../services/servicesService";
import { getPricingPackages } from "../../services/pricingPackagesService";
import { getAllUsers } from "../../services/usersService";
import RequestsTable from "../../components/admin/requests/RequestsTable";
import Pagination from "../../components/ui/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../services/paging";
import RequestDetailsModal from "../../components/admin/requests/RequestDetailsModal";
import AssignRequestUserModal from "../../components/admin/requests/AssignRequestUserModal";

export default function RequestsAdminPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

    const [requests, setRequests] = useState([]);
    const [services, setServices] = useState([]);
    const [pricingPackages, setPricingPackages] = useState([]);
    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const [assignModalState, setAssignModalState] = useState({
        isOpen: false,
        request: null,
    });

    const servicesMap = useMemo(() => {
        return new Map(services.map((service) => [service.id, service]));
    }, [services]);

    const packagesMap = useMemo(() => {
        return new Map(
            pricingPackages.map((pricingPackage) => [
                pricingPackage.id,
                pricingPackage,
            ])
        );
    }, [pricingPackages]);

    const usersMap = useMemo(() => {
        return new Map(users.map((user) => [user.id, user]));
    }, [users]);

    async function loadData() {
        try {
            setIsLoading(true);

            const [requestsData, servicesData, packagesData, usersData] =
                await Promise.all([
                    getClientRequests({ page, pageSize }),
                    getServices(),
                    getPricingPackages(),
                    getAllUsers(),
                ]);

            // Сортує вже сервер — найновіші зверху. Тут сортувати не можна:
            // на руках лише одна сторінка, і порядок був би «правильним»
            // усередині неї, але неправильним у межах усього списку.
            setRequests(requestsData.items);
            setTotal(requestsData.total);

            setServices(servicesData);
            setPricingPackages(packagesData);
            setUsers(usersData);
        } catch (error) {
            console.error("Failed to load client requests:", error);
            toast.error("Не вдалося завантажити заявки.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    const closeModal = () => {
        setSelectedRequest(null);
    };

    const openAssignModal = (request) => {
        setAssignModalState({
            isOpen: true,
            request,
        });
    };

    const closeAssignModal = () => {
        setAssignModalState({
            isOpen: false,
            request: null,
        });
    };

    const refreshSelectedRequest = (requestId, patch) => {
        setRequests((prev) =>
            prev.map((request) =>
                request.id === requestId ? { ...request, ...patch } : request
            )
        );

        setSelectedRequest((prev) =>
            prev && prev.id === requestId ? { ...prev, ...patch } : prev
        );

        setAssignModalState((prev) => {
            if (!prev.request || prev.request.id !== requestId) {
                return prev;
            }

            return {
                ...prev,
                request: {
                    ...prev.request,
                    ...patch,
                },
            };
        });
    };

    const handleStatusChange = async (id, status) => {
        try {
            setIsSubmitting(true);

            await changeClientRequestStatus(id, status);

            refreshSelectedRequest(id, {
                status,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Статус заявки оновлено.");
        } catch (error) {
            console.error("Failed to change request status:", error);
            toast.error("Не вдалося оновити статус.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAdminNoteSave = async (id, adminNote) => {
        try {
            setIsSubmitting(true);

            await changeClientRequestAdminNote(id, adminNote);

            refreshSelectedRequest(id, {
                adminNote: adminNote || null,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Нотатку збережено.");
        } catch (error) {
            console.error("Failed to change admin note:", error);
            toast.error("Не вдалося зберегти нотатку.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAssignUser = async (requestId, userId) => {
        try {
            setIsSubmitting(true);

            await assignClientRequestToUser(requestId, userId);

            refreshSelectedRequest(requestId, {
                userId,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Заявку привʼязано до клієнта.");
        } catch (error) {
            console.error("Failed to assign request user:", error);
            toast.error("Не вдалося привʼязати заявку до клієнта.");
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUnassignUser = async (request) => {
        const assignedUser = request.userId ? usersMap.get(request.userId) : null;

        const clientName =
            assignedUser?.fullName ||
            assignedUser?.email ||
            "цього клієнта";

        const confirmed = window.confirm(
            `Відвʼязати заявку від ${clientName}? Клієнт більше не бачитиме цю заявку в порталі.`
        );

        if (!confirmed) return;

        try {
            setIsSubmitting(true);

            await unassignClientRequestUser(request.id);

            refreshSelectedRequest(request.id, {
                userId: null,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Заявку відвʼязано від клієнта.");
        } catch (error) {
            console.error("Failed to unassign request user:", error);
            toast.error("Не вдалося відвʼязати заявку від клієнта.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleComplete = async (id) => {
        try {
            setIsSubmitting(true);

            await completeClientRequest(id);

            refreshSelectedRequest(id, {
                status: REQUEST_STATUS.Completed,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Заявку завершено.");
        } catch (error) {
            console.error("Failed to complete request:", error);
            toast.error("Не вдалося завершити заявку.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReject = async (id) => {
        try {
            setIsSubmitting(true);

            await rejectClientRequest(id);

            refreshSelectedRequest(id, {
                status: REQUEST_STATUS.Rejected,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Заявку відхилено.");
        } catch (error) {
            console.error("Failed to reject request:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося відхилити заявку."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (request) => {
        const confirmed = window.confirm(
            `Видалити заявку від «${request.fullName}»? Цю дію не можна скасувати.`,
        );

        if (!confirmed) return;

        try {
            setIsSubmitting(true);

            await deleteClientRequest(request.id);

            toast.success("Заявку видалено.");
            await loadData();
        } catch (error) {
            console.error("Failed to delete request:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити заявку."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Requests
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Заявки клієнтів
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Переглядайте заявки, змінюйте статуси, залишайте
                        внутрішні нотатки та привʼязуйте заявки до клієнтських
                        акаунтів.
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white px-5 py-4 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Total requests
                    </p>

                    {/* Не requests.length: там лише поточна сторінка.
                        Total приходить із сервера й рахує всі заявки. */}
                    <p className="mt-1 font-heading text-3xl font-bold text-brand-madison">
                        {total}
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження заявок...</p>
                </div>
            ) : (
                <>
                <RequestsTable
                    requests={requests}
                    servicesMap={servicesMap}
                    packagesMap={packagesMap}
                    usersMap={usersMap}
                    onView={setSelectedRequest}
                    onAssignUser={openAssignModal}
                    onUnassignUser={handleUnassignUser}
                    onDelete={handleDelete}
                    isSubmitting={isSubmitting}
                />

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
                </>
            )}

            <RequestDetailsModal
                isOpen={Boolean(selectedRequest)}
                request={selectedRequest}
                servicesMap={servicesMap}
                packagesMap={packagesMap}
                onClose={closeModal}
                onStatusChange={handleStatusChange}
                onAdminNoteSave={handleAdminNoteSave}
                onComplete={handleComplete}
                onReject={handleReject}
                isSubmitting={isSubmitting}
            />

            <AssignRequestUserModal
                isOpen={assignModalState.isOpen}
                request={assignModalState.request}
                users={users}
                onClose={closeAssignModal}
                onAssign={handleAssignUser}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}