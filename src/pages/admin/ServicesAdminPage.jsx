"use client";

import { Button } from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    activateService,
    createService,
    deactivateService,
    deleteService,
    getServices,
    updateService,
} from "../../services/servicesService";
import ServicesTable from "../../components/admin/services/ServicesTable";
import ServiceFormModal from "../../components/admin/services/ServiceFormModal";
import { getApiErrorMessage } from "../../utils/apiError";

export default function ServicesAdminPage() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: "create",
        service: null,
    });

    async function loadServices() {
        try {
            setIsLoading(true);

            const data = await getServices();

            setServices([...data].sort((a, b) => a.sortOrder - b.sortOrder));
        } catch (error) {
            console.error("Failed to load services:", error);
            toast.error("Не вдалося завантажити послуги.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadServices();
    }, []);

    const openCreateModal = () => {
        setModalState({
            isOpen: true,
            mode: "create",
            service: null,
        });
    };

    const openEditModal = (service) => {
        setModalState({
            isOpen: true,
            mode: "edit",
            service,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            mode: "create",
            service: null,
        });
    };

    const handleSubmit = async (payload) => {
        try {
            setIsSubmitting(true);

            if (modalState.mode === "edit" && modalState.service) {
                await updateService(modalState.service.id, payload);
                toast.success("Послугу оновлено.");
            } else {
                await createService(payload);
                toast.success("Послугу створено.");
            }

            closeModal();
            await loadServices();
        } catch (error) {
            console.error("Failed to save service:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося зберегти послугу."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleActive = async (service) => {
        try {
            if (service.isActive) {
                await deactivateService(service.id);
                toast.success("Послугу деактивовано.");
            } else {
                await activateService(service.id);
                toast.success("Послугу активовано.");
            }

            await loadServices();
        } catch (error) {
            console.error("Failed to change service status:", error);
            toast.error("Не вдалося змінити статус послуги.");
        }
    };

    const handleDelete = async (service) => {
        const confirmed = window.confirm(
            `Видалити послугу "${service.name}"? Цю дію не можна скасувати.`
        );

        if (!confirmed) return;

        try {
            await deleteService(service.id);
            toast.success("Послугу видалено.");
            await loadServices();
        } catch (error) {
            console.error("Failed to delete service:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити послугу."));
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Services
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Послуги
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Керуйте послугами, які відображаються на публічній сторінці
                        сайту.
                    </p>
                </div>

                <Button
                    onClick={openCreateModal}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Створити послугу
                </Button>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження послуг...</p>
                </div>
            ) : (
                <ServicesTable
                    services={services}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    onToggleActive={handleToggleActive}
                />
            )}

            <ServiceFormModal
                isOpen={modalState.isOpen}
                mode={modalState.mode}
                service={modalState.service}
                onClose={closeModal}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}