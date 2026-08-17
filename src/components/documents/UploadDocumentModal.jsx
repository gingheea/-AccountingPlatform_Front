"use client";

import SelectField from "../ui/SelectField";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Button, Input } from "@relume_io/relume-ui";
import {
    ACCEPTED_FILE_TYPES,
    DOCUMENT_CATEGORIES,
    DOCUMENT_DIRECTIONS,
    MAX_FILE_SIZE_BYTES,
    formatFileSize,
} from "../../constants/documents";

const emptyForm = {
    title: "",
    category: 6,
    direction: 1,
    userId: "",
    note: "",
};

const fieldClass = "min-h-12";

/**
 * Shared by the portal and the admin panel. Passing `users` switches it into
 * admin mode, where the target client and the direction are pickable.
 */
export default function UploadDocumentModal({
                                                isOpen,
                                                onClose,
                                                onSubmit,
                                                isSubmitting,
                                                users = null,
                                            }) {
    const isAdminMode = Array.isArray(users);

    const [form, setForm] = useState(emptyForm);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleFileChange = (event) => {
        const selected = event.target.files?.[0] ?? null;

        setErrorMessage("");
        setFile(selected);

        // Reuse the file name as a default title so the field is rarely empty.
        if (selected && !form.title.trim()) {
            setForm((prev) => ({
                ...prev,
                title: selected.name.replace(/\.[^.]+$/, ""),
            }));
        }
    };

    const resetAndClose = () => {
        setForm(emptyForm);
        setFile(null);
        setErrorMessage("");
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!file) {
            setErrorMessage("Оберіть файл.");
            return;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            setErrorMessage(
                `Файл завеликий (${formatFileSize(file.size)}). Максимум — ${formatFileSize(
                    MAX_FILE_SIZE_BYTES,
                )}.`,
            );
            return;
        }

        if (!form.title.trim()) {
            setErrorMessage("Вкажіть назву документа.");
            return;
        }

        if (isAdminMode && !form.userId) {
            setErrorMessage("Оберіть клієнта.");
            return;
        }

        const payload = {
            file,
            title: form.title.trim(),
            category: Number(form.category),
            note: form.note.trim() || null,
        };

        if (isAdminMode) {
            payload.userId = form.userId;
            payload.direction = Number(form.direction);
        }

        const succeeded = await onSubmit(payload);

        if (succeeded) {
            setForm(emptyForm);
            setFile(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Documents
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            Завантажити документ
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={resetAndClose}
                        className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Файл *
                        </label>

                        <input
                            type="file"
                            accept={ACCEPTED_FILE_TYPES}
                            onChange={handleFileChange}
                            className="w-full rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-sm text-brand-ink file:mr-4 file:rounded-button file:border-0 file:bg-brand-madison file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-madisonDark"
                        />

                        <p className="mt-2 text-xs text-brand-muted">
                            PDF, зображення, Word, Excel, ZIP. Максимум{" "}
                            {formatFileSize(MAX_FILE_SIZE_BYTES)}.
                            {file ? ` Обрано: ${file.name} (${formatFileSize(file.size)}).` : ""}
                        </p>
                    </div>

                    {isAdminMode && (
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Клієнт *
                            </label>

                            <SelectField
                                value={form.userId}
                                onChange={handleChange("userId")}
                                className={fieldClass}
                            >
                                <option value="">Оберіть клієнта</option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.fullName || user.email} ({user.email})
                                    </option>
                                ))}
                            </SelectField>
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Назва *
                        </label>

                        <Input
                            type="text"
                            value={form.title}
                            onChange={handleChange("title")}
                            placeholder="Декларація за IV квартал"
                            className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                        />
                    </div>

                    <div className={isAdminMode ? "grid gap-4 md:grid-cols-2" : ""}>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Категорія *
                            </label>

                            <SelectField
                                value={form.category}
                                onChange={handleChange("category")}
                                className={fieldClass}
                            >
                                {DOCUMENT_CATEGORIES.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </SelectField>
                        </div>

                        {isAdminMode && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                    Напрямок *
                                </label>

                                <SelectField
                                    value={form.direction}
                                    onChange={handleChange("direction")}
                                    className={fieldClass}
                                >
                                    {DOCUMENT_DIRECTIONS.map((direction) => (
                                        <option key={direction.value} value={direction.value}>
                                            {direction.label}
                                        </option>
                                    ))}
                                </SelectField>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Коментар
                        </label>

                        <textarea
                            value={form.note}
                            onChange={handleChange("note")}
                            rows={3}
                            placeholder="Необовʼязково"
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
                            onClick={resetAndClose}
                            className="rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-pampas"
                        >
                            Скасувати
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Завантаження..." : "Завантажити"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
