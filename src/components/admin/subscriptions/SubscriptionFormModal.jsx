"use client";

import SelectField from "../../ui/SelectField";
import { useState } from "react";
import { Button, Input } from "@relume_io/relume-ui";
import { RxCross2 } from "react-icons/rx";

const fieldClass = "min-h-12";

const today = () => new Date().toISOString().slice(0, 10);

export default function SubscriptionFormModal({
                                                  isOpen,
                                                  users,
                                                  services,
                                                  packages,
                                                  onClose,
                                                  onSubmit,
                                                  isSubmitting,
                                              }) {
    const [form, setForm] = useState({
        userId: "",
        kind: "package",
        targetId: "",
        startedAt: today(),
        note: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const options = form.kind === "package" ? packages : services;

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    // Зміна типу скидає вибір: id пакета в полі послуги був би сміттям.
    const handleKindChange = (event) => {
        setForm((prev) => ({ ...prev, kind: event.target.value, targetId: "" }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!form.userId) return setErrorMessage("Оберіть клієнта.");
        if (!form.targetId) return setErrorMessage("Оберіть пакет або послугу.");

        const succeeded = await onSubmit({
            userId: form.userId,
            serviceId: form.kind === "service" ? form.targetId : null,
            pricingPackageId: form.kind === "package" ? form.targetId : null,
            startedAtUtc: new Date(form.startedAt).toISOString(),
            note: form.note.trim() || null,
        });

        if (succeeded) {
            setForm({ userId: "", kind: "package", targetId: "", startedAt: today(), note: "" });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Subscriptions
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            Підключити обслуговування
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Клієнт *
                        </label>

                        <SelectField value={form.userId} onChange={handleChange("userId")} className={fieldClass}>
                            <option value="">Оберіть клієнта</option>

                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.fullName || user.email} ({user.email})
                                </option>
                            ))}
                        </SelectField>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Що підключаємо *
                            </label>

                            <SelectField value={form.kind} onChange={handleKindChange} className={fieldClass}>
                                <option value="package">Пакет супроводу</option>
                                <option value="service">Окрема послуга</option>
                            </SelectField>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                {form.kind === "package" ? "Пакет *" : "Послуга *"}
                            </label>

                            <SelectField value={form.targetId} onChange={handleChange("targetId")} className={fieldClass}>
                                <option value="">Оберіть варіант</option>

                                {options.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </SelectField>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Дата початку *
                        </label>

                        <Input
                            type="date"
                            value={form.startedAt}
                            onChange={handleChange("startedAt")}
                            className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink focus:border-brand-madison focus:ring-brand-madison"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Коментар
                        </label>

                        <textarea
                            value={form.note}
                            onChange={handleChange("note")}
                            rows={3}
                            placeholder="Видно клієнту в його кабінеті"
                            className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                        />
                    </div>

                    {errorMessage && (
                        <p className="rounded-button bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    <div className="mt-2 flex flex-col gap-3 md:flex-row md:justify-end">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-pampas"
                        >
                            Скасувати
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Збереження..." : "Підключити"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
