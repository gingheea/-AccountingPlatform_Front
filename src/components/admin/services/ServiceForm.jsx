"use client";

import { Button, Input } from "@relume_io/relume-ui";
import  { useEffect, useState } from "react";

const initialForm = {
    name: "",
    description: "",
    price: "",
    priceLabel: "",
    sortOrder: "0",
    isActive: true,
    tagsText: "",
};

export default function ServiceForm({
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
            description: initialValue.description ?? "",
            price: String(initialValue.price ?? ""),
            priceLabel: initialValue.priceLabel ?? "",
            sortOrder: String(initialValue.sortOrder ?? 0),
            isActive: Boolean(initialValue.isActive),
            tagsText: initialValue.tags?.join(", ") ?? "",
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
            description: form.description.trim() || null,
            price: Number(form.price),
            priceLabel: form.priceLabel.trim() || null,
            sortOrder: Number(form.sortOrder),
            isActive: form.isActive,
            tags: form.tagsText
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Назва послуги *
                </label>

                <Input
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    placeholder="Наприклад: Облік ФОП"
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
                    placeholder="Короткий опис послуги"
                    className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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
                        Текст ціни
                    </label>

                    <Input
                        value={form.priceLabel}
                        onChange={handleChange("priceLabel")}
                        placeholder="від 1500 грн"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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

                <label className="flex items-center gap-3 rounded-button border border-brand-border bg-brand-pampas px-4 py-3">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={handleChange("isActive")}
                        className="size-4 accent-brand-madison"
                    />

                    <span className="text-sm font-semibold text-brand-ink">
                        Активна послуга
                    </span>
                </label>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Теги
                </label>

                <Input
                    value={form.tagsText}
                    onChange={handleChange("tagsText")}
                    placeholder="Звітність, Податки, Документи"
                    className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                />

                <p className="mt-2 text-xs leading-5 text-brand-muted">
                    Вводь теги через кому. Максимум залежить від backend-валідації.
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