"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";

const initialForm = {
    name: "",
    badge: "",
    description: "",
    price: "",
    priceLabel: "",
    periodLabel: "",
    isRecommended: false,
    isActive: true,
    featuresText: "",
    sortOrder: "0",
};

export default function PricingPackageForm({
                                               initialValue,
                                               onSubmit,
                                               onCancel,
                                               isSubmitting = false,
                                           }) {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (!initialValue) {
            setForm(initialForm);
            return;
        }

        setForm({
            name: initialValue.name ?? "",
            badge: initialValue.badge ?? "",
            description: initialValue.description ?? "",
            price: String(initialValue.price ?? ""),
            priceLabel: initialValue.priceLabel ?? "",
            periodLabel: initialValue.periodLabel ?? "",
            isRecommended: Boolean(initialValue.isRecommended),
            isActive: Boolean(initialValue.isActive),
            featuresText: initialValue.features?.join(", ") ?? "",
            sortOrder: String(initialValue.sortOrder ?? 0),
        });
    }, [initialValue]);

    const handleChange = (field) => (event) => {
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            name: form.name.trim(),
            badge: form.badge.trim() || null,
            description: form.description.trim() || null,
            price: Number(form.price),
            priceLabel: form.priceLabel.trim() || null,
            periodLabel: form.periodLabel.trim() || null,
            isRecommended: form.isRecommended,
            isActive: form.isActive,
            features: form.featuresText
                .split(",")
                .map((feature) => feature.trim())
                .filter(Boolean),
            sortOrder: Number(form.sortOrder),
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Назва пакету *
                </label>

                <Input
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    placeholder="Наприклад: Для ФОП"
                    className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Badge
                </label>

                <Input
                    value={form.badge}
                    onChange={handleChange("badge")}
                    placeholder="Для старту / Рекомендовано / Разово"
                    className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Опис
                </label>

                <textarea
                    value={form.description}
                    onChange={handleChange("description")}
                    rows={4}
                    placeholder="Короткий опис тарифного пакету"
                    className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Ціна *
                    </label>

                    <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange("price")}
                        required
                        placeholder="1500"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Price label
                    </label>

                    <Input
                        value={form.priceLabel}
                        onChange={handleChange("priceLabel")}
                        placeholder="грн"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Period label
                    </label>

                    <Input
                        value={form.periodLabel}
                        onChange={handleChange("periodLabel")}
                        placeholder="на місяць / за годину"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Порядок
                    </label>

                    <Input
                        type="number"
                        min="0"
                        value={form.sortOrder}
                        onChange={handleChange("sortOrder")}
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <label className="flex items-center gap-3 rounded-button border border-brand-border bg-brand-pampas px-4 py-3 md:mt-7">
                    <input
                        type="checkbox"
                        checked={form.isRecommended}
                        onChange={handleChange("isRecommended")}
                        className="size-4 accent-brand-madison"
                    />

                    <span className="text-sm font-semibold text-brand-ink">
                        Рекомендований
                    </span>
                </label>

                <label className="flex items-center gap-3 rounded-button border border-brand-border bg-brand-pampas px-4 py-3 md:mt-7">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={handleChange("isActive")}
                        className="size-4 accent-brand-madison"
                    />

                    <span className="text-sm font-semibold text-brand-ink">
                        Активний
                    </span>
                </label>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Features
                </label>

                <textarea
                    value={form.featuresText}
                    onChange={handleChange("featuresText")}
                    rows={4}
                    placeholder="Облік доходів та витрат, Розрахунок податків, Підготовка базової звітності"
                    className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                />

                <p className="mt-2 text-xs leading-5 text-brand-muted">
                    Вводь пункти через кому. Вони будуть показані як список з галочками.
                </p>
            </div>

            <div className="mt-2 flex flex-wrap justify-end gap-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    className="rounded-button border border-brand-border bg-white px-5 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                >
                    Скасувати
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-button bg-brand-madison px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Збереження..." : "Зберегти"}
                </Button>
            </div>
        </form>
    );
}