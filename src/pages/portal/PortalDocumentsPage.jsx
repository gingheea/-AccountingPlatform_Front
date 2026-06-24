"use client";

import React from "react";

export default function PortalDocumentsPage() {
    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Documents
                </p>

                <h2 className="font-heading text-4xl font-bold text-brand-ink">
                    Документи
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Тут будуть документи, які ви завантажили бухгалтеру, і
                    документи, які бухгалтер передав вам: звітність, рахунки,
                    акти, договори та інші файли.
                </p>
            </section>

            <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Податкова звітність
                    </p>

                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                        Декларації, звіти та документи, підготовлені бухгалтером.
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Рахунки та акти
                    </p>

                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                        Документи для оплат, актів виконаних робіт і договорів.
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Завантаження файлів
                    </p>

                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                        Клієнт зможе передавати бухгалтеру первинні документи.
                    </p>
                </div>
            </section>
        </div>
    );
}