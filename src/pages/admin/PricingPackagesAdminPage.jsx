"use client";

import { Button } from "@relume_io/relume-ui";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    createPricingPackage,
    deletePricingPackage,
    getPricingPackages,
    updatePricingPackage,
    activatePricingPackage,
    deactivatePricingPackage,
} from "../../services/pricingPackagesService";
import PricingPackagesTable from "../../components/admin/pricing-packages/PricingPackagesTable";
import PricingPackageFormModal from "../../components/admin/pricing-packages/PricingPackageFormModal";

export default function PricingPackagesAdminPage() {
    const [pricingPackages, setPricingPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: "create",
        pricingPackage: null,
    });

    async function loadPricingPackages() {
        try {
            setIsLoading(true);

            const data = await getPricingPackages();

            setPricingPackages(
                [...data].sort((a, b) => a.sortOrder - b.sortOrder)
            );
        } catch (error) {
            console.error("Failed to load pricing packages:", error);
            toast.error("Не вдалося завантажити тарифні пакети.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadPricingPackages();
    }, []);

    const openCreateModal = () => {
        setModalState({
            isOpen: true,
            mode: "create",
            pricingPackage: null,
        });
    };

    const openEditModal = (pricingPackage) => {
        setModalState({
            isOpen: true,
            mode: "edit",
            pricingPackage,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            mode: "create",
            pricingPackage: null,
        });
    };

    const handleSubmit = async (payload) => {
        try {
            setIsSubmitting(true);

            if (modalState.mode === "edit" && modalState.pricingPackage) {
                await updatePricingPackage(
                    modalState.pricingPackage.id,
                    payload
                );

                toast.success("Тарифний пакет оновлено.");
            } else {
                await createPricingPackage(payload);
                toast.success("Тарифний пакет створено.");
            }

            closeModal();
            await loadPricingPackages();
        } catch (error) {
            console.error("Failed to save pricing package:", error);
            toast.error("Не вдалося зберегти тарифний пакет.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (pricingPackage) => {
        const confirmed = window.confirm(
            `Видалити тарифний пакет "${pricingPackage.name}"? Цю дію не можна скасувати.`
        );

        if (!confirmed) return;

        try {
            await deletePricingPackage(pricingPackage.id);
            toast.success("Тарифний пакет видалено.");
            await loadPricingPackages();
        } catch (error) {
            console.error("Failed to delete pricing package:", error);
            toast.error("Не вдалося видалити тарифний пакет.");
        }
    };

    const handleToggleActive = async (pricingPackage) => {
        try {
            if (pricingPackage.isActive) {
                await deactivatePricingPackage(pricingPackage.id);
                toast.success("Тарифний пакет деактивовано.");
            } else {
                await activatePricingPackage(pricingPackage.id);
                toast.success("Тарифний пакет активовано.");
            }

            await loadPricingPackages();
        } catch (error) {
            console.error("Failed to change pricing package status:", error);
            toast.error("Не вдалося змінити статус тарифного пакету.");
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Pricing Packages
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Тарифні пакети
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Керуйте тарифними пакетами, які відображаються в блоці
                        цін на публічній сторінці.
                    </p>
                </div>

                <Button
                    onClick={openCreateModal}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Створити пакет
                </Button>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">
                        Завантаження тарифних пакетів...
                    </p>
                </div>
            ) : (
                <PricingPackagesTable
                    pricingPackages={pricingPackages}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    onToggleActive={handleToggleActive}
                />
            )}

            <PricingPackageFormModal
                isOpen={modalState.isOpen}
                mode={modalState.mode}
                pricingPackage={modalState.pricingPackage}
                onClose={closeModal}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}