"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";

const ROLES = ["Admin", "User"];

const initialForm = {
    fullName: "",
    email: "",
    password: "",
    taxId: "",
    isActive: true,
    roles: ["User"],
};

export default function UserForm({
                                     initialValue,
                                     mode = "create",
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
            fullName: initialValue.fullName ?? "",
            email: initialValue.email ?? "",
            password: "",
            taxId: initialValue.taxId ?? "",
            isActive: Boolean(initialValue.isActive),
            roles: initialValue.roles?.length ? initialValue.roles : ["User"],
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

    const handleRoleChange = (role) => (event) => {
        const checked = event.target.checked;

        setForm((prev) => {
            if (checked) {
                return {
                    ...prev,
                    roles: [...new Set([...prev.roles, role])],
                };
            }

            return {
                ...prev,
                roles: prev.roles.filter((item) => item !== role),
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (mode === "create") {
            onSubmit({
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                password: form.password,
                taxId: form.taxId.trim() || null,
                roles: form.roles,
            });

            return;
        }

        onSubmit({
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            taxId: form.taxId.trim() || null,
            isActive: form.isActive,
            roles: form.roles,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Повне імʼя *
                </label>

                <Input
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    required
                    placeholder="Наприклад: Іван Петренко"
                    className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Email *
                </label>

                <Input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    placeholder="client@example.com"
                    className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                />
            </div>

            {mode === "create" && (
                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Пароль *
                    </label>

                    <Input
                        type="password"
                        value={form.password}
                        onChange={handleChange("password")}
                        required
                        minLength={8}
                        placeholder="Password123"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />

                    <p className="mt-2 text-xs leading-5 text-brand-muted">
                        Мінімум 8 символів, велика літера, мала літера і цифра.
                    </p>
                </div>
            )}

            <div>
                <label className="mb-2 block text-sm font-semibold text-brand-ink">
                    Tax ID
                </label>

                <Input
                    value={form.taxId}
                    onChange={handleChange("taxId")}
                    placeholder="ІПН / Tax ID"
                    className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                />
            </div>

            <div className="rounded-card border border-brand-border bg-brand-pampas p-4">
                <p className="mb-3 text-sm font-semibold text-brand-ink">
                    Ролі *
                </p>

                <div className="flex flex-wrap gap-4">
                    {ROLES.map((role) => (
                        <label
                            key={role}
                            className="flex items-center gap-3 rounded-button border border-brand-border bg-white px-4 py-3"
                        >
                            <input
                                type="checkbox"
                                checked={form.roles.includes(role)}
                                onChange={handleRoleChange(role)}
                                className="size-4 accent-brand-madison"
                            />

                            <span className="text-sm font-semibold text-brand-ink">
                                {role}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {mode === "edit" && (
                <label className="flex items-center gap-3 rounded-button border border-brand-border bg-brand-pampas px-4 py-3">
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={handleChange("isActive")}
                        className="size-4 accent-brand-madison"
                    />

                    <span className="text-sm font-semibold text-brand-ink">
                        Активний користувач
                    </span>
                </label>
            )}

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
                    disabled={isSubmitting || form.roles.length === 0}
                    className="rounded-button bg-brand-madison px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Збереження..." : "Зберегти"}
                </Button>
            </div>
        </form>
    );
}