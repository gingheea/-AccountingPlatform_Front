"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPortalMe } from "../../services/portalService";

export default function PortalProfilePage() {
    const [me, setMe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadMe() {
            try {
                setIsLoading(true);

                const data = await getPortalMe();

                setMe(data);
            } catch (error) {
                console.error("Failed to load portal profile:", error);
                toast.error("Не вдалося завантажити профіль.");
            } finally {
                setIsLoading(false);
            }
        }

        loadMe();
    }, []);

    if (isLoading) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">Завантаження профілю...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Profile
                </p>

                <h2 className="font-heading text-4xl font-bold text-brand-ink">
                    Профіль клієнта
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Основні дані вашого клієнтського акаунта.
                </p>
            </section>

            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold text-brand-muted">
                            Імʼя
                        </p>

                        <p className="mt-2 text-lg font-semibold text-brand-ink">
                            {me?.fullName || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-brand-muted">
                            Email
                        </p>

                        <p className="mt-2 text-lg font-semibold text-brand-ink">
                            {me?.email || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-brand-muted">
                            ІПН / Tax ID
                        </p>

                        <p className="mt-2 text-lg font-semibold text-brand-ink">
                            {me?.taxId || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-brand-muted">
                            Ролі
                        </p>

                        <p className="mt-2 text-lg font-semibold text-brand-ink">
                            {me?.roles?.join(", ") || "—"}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}