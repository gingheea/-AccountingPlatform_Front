"use client";

import { RxCross2 } from "react-icons/rx";
import PricingPackageForm from "./PricingPackageForm";

export default function PricingPackageFormModal({
                                                    isOpen,
                                                    mode = "create",
                                                    pricingPackage,
                                                    onClose,
                                                    onSubmit,
                                                    isSubmitting,
                                                }) {
    if (!isOpen) return null;

    const title =
        mode === "edit" ? "Редагувати тарифний пакет" : "Створити тарифний пакет";

    const description =
        mode === "edit"
            ? "Оновіть дані пакету, які відображаються на публічній сторінці."
            : "Додайте новий тарифний пакет для публічної сторінки.";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Pricing Packages
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            {title}
                        </h2>

                        <p className="mt-2 leading-7 text-brand-muted">
                            {description}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <PricingPackageForm
                    initialValue={pricingPackage}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}