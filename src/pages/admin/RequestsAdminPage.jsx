"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    assignClientRequestToUser,
    changeClientRequestAdminNote,
    changeClientRequestStatus,
    completeClientRequest,
    getClientRequests,
    rejectClientRequest,
    unassignClientRequestUser,
} from "../../services/clientRequestsService";
import { getServices } from "../../services/servicesService";
import { getPricingPackages } from "../../services/pricingPackagesService";
import { getUsers } from "../../services/usersService";
import RequestsTable from "../../components/admin/requests/RequestsTable";
import RequestDetailsModal from "../../components/admin/requests/RequestDetailsModal";
import AssignRequestUserModal from "../../components/admin/requests/AssignRequestUserModal";

export default function RequestsAdminPage() {
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
                    getClientRequests(),
                    getServices(),
                    getPricingPackages(),
                    getUsers(),
                ]);

            setRequests(
                [...requestsData].sort(
                    (a, b) => new Date(b.createdAtUtc) - new Date(a.createdAtUtc)
                )
            );

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
    }, []);

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
                status: 3,
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
                status: 4,
                updatedAtUtc: new Date().toISOString(),
            });

            toast.success("Заявку відхилено.");
        } catch (error) {
            console.error("Failed to reject request:", error);
            toast.error("Не вдалося відхилити заявку.");
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
                    <p className="mt-1 font-heading text-3xl font-bold text-brand-madison">
                        {requests.length}
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження заявок...</p>
                </div>
            ) : (
                <RequestsTable
                    requests={requests}
                    servicesMap={servicesMap}
                    packagesMap={packagesMap}
                    usersMap={usersMap}
                    onView={setSelectedRequest}
                    onAssignUser={openAssignModal}
                    onUnassignUser={handleUnassignUser}
                    isSubmitting={isSubmitting}
                />
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