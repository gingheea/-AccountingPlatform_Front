"use client";

import { useState } from "react";
import { Button, Input } from "@relume_io/relume-ui";
import { RxCross2, RxDragHandleDots2, RxTrash } from "react-icons/rx";
import SelectField from "../../ui/SelectField";
import { PERIOD_KIND, PERIOD_KIND_LABELS } from "../../../constants/periods";

const inputClass =
    "min-h-11 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison";

const emptyForm = { name: "", kind: String(PERIOD_KIND.Monthly), items: [""] };

export default function ChecklistTemplateFormModal({
                                                       template,
                                                       onClose,
                                                       onSubmit,
                                                       isSubmitting,
                                                   }) {
    const isEdit = Boolean(template);

    // The parent mounts this component only while the dialog is open, so the
    // initial state IS the reset. Resetting from a useEffect instead would mean
    // a synchronous setState in an effect body — an extra render pass, and the
    // exact pattern that once turned into an infinite loop in usePagedList.
    const [form, setForm] = useState(() =>
        template
            ? {
                name: template.name,
                kind: String(template.kind),
                items: template.items.map((x) => x.title),
            }
            : emptyForm
    );

    const [errorMessage, setErrorMessage] = useState("");

    const setItem = (index, value) =>
        setForm((prev) => ({
            ...prev,
            items: prev.items.map((item, i) => (i === index ? value : item)),
        }));

    const addItem = () =>
        setForm((prev) => ({ ...prev, items: [...prev.items, ""] }));

    const removeItem = (index) =>
        setForm((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        // Blank rows are the normal way people leave an input they changed their
        // mind about, so they are dropped rather than reported as an error.
        const items = form.items.map((x) => x.trim()).filter(Boolean);

        if (items.length === 0) {
            setErrorMessage("Додайте хоча б один крок.");
            return;
        }

        await onSubmit({
            name: form.name.trim(),
            kind: Number(form.kind),
            items,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-ink/40 px-4 py-8">
            <div className="w-full max-w-2xl rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Checklist
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            {isEdit ? "Редагувати шаблон" : "Новий шаблон"}
                        </h2>

                        <p className="mt-2 max-w-lg leading-6 text-brand-muted">
                            Кроки, які повторюються щоперіоду. Зміни тут не впливають на
                            вже створені періоди — вони зберігають свою копію.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 shrink-0 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Назва *
                            </label>

                            <Input
                                value={form.name}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, name: event.target.value }))
                                }
                                required
                                maxLength={150}
                                placeholder="ФОП 3 група без ПДВ"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Періодичність *
                            </label>

                            <SelectField
                                value={form.kind}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, kind: event.target.value }))
                                }
                                className="min-h-11"
                                // Changing this after periods exist would make their
                                // numbering meaningless, so the backend refuses it too.
                                disabled={isEdit}
                            >
                                {Object.entries(PERIOD_KIND_LABELS).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </SelectField>

                            {isEdit && (
                                <p className="mt-2 text-xs leading-5 text-brand-gothic">
                                    Періодичність змінити не можна — за нею вже створені періоди.
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Кроки *
                        </label>

                        <div className="grid gap-2">
                            {form.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-button bg-brand-pampas text-sm font-semibold text-brand-madison">
                                        {index + 1}
                                    </span>

                                    <Input
                                        value={item}
                                        onChange={(event) => setItem(index, event.target.value)}
                                        maxLength={200}
                                        placeholder="Наприклад: подати декларацію"
                                        className={`${inputClass} flex-1`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        disabled={form.items.length === 1}
                                        aria-label="Видалити крок"
                                        className="flex size-9 shrink-0 items-center justify-center rounded-button border border-brand-border text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <RxTrash className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addItem}
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-madison underline underline-offset-4 transition-colors hover:text-brand-madisonDark"
                        >
                            <RxDragHandleDots2 className="size-4" />
                            Додати крок
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="rounded-button bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    <div className="flex flex-wrap justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
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
            </div>
        </div>
    );
}
