"use client";

import React from "react";
import { RxCross2 } from "react-icons/rx";
import ServiceForm from "./ServiceForm";

export default function ServiceFormModal({
                                             isOpen,
                                             mode = "create",
                                             service,
                                             onClose,
                                             onSubmit,
                                             isSubmitting,
                                         }) {
    if (!isOpen) return null;

    const title = mode === "edit" ? "Редагувати послугу" : "Створити послугу";
    const description =
        mode === "edit"
            ? "Оновіть дані послуги, які відображаються на публічній сторінці."
            : "Додайте нову послугу для публічної сторінки.";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Services
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

                <ServiceForm
                    initialValue={service}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}