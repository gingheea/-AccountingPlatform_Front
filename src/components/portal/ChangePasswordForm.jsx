"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "@relume_io/relume-ui";
import { changeOwnPassword } from "../../services/portalService";
import { getApiErrorMessage } from "../../utils/apiError";

const inputClass =
    "min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison";

const emptyForm = { current: "", next: "", confirmation: "" };

export default function ChangePasswordForm() {
    const [form, setForm] = useState(emptyForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (field) => (event) =>
        setForm((prev) => ({ ...prev, [field]: event.target.value }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (form.next.length < 8) {
            setErrorMessage("Новий пароль має містити щонайменше 8 символів.");
            return;
        }

        if (form.next !== form.confirmation) {
            setErrorMessage("Паролі не збігаються.");
            return;
        }

        try {
            setIsSubmitting(true);

            await changeOwnPassword(form.current, form.next);

            toast.success("Пароль змінено.");
            setForm(emptyForm);
        } catch (error) {
            console.error("Failed to change password:", error);
            setErrorMessage(getApiErrorMessage(error, "Не вдалося змінити пароль."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
            <h3 className="font-heading text-2xl font-bold text-brand-ink">
                Зміна пароля
            </h3>

            <p className="mt-2 max-w-xl leading-7 text-brand-muted">
                Щоб змінити пароль, підтвердіть поточний. Після зміни вхід за старим
                паролем перестане працювати.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid max-w-md gap-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Поточний пароль
                    </label>

                    <Input
                        type="password"
                        value={form.current}
                        onChange={handleChange("current")}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Новий пароль
                    </label>

                    <Input
                        type="password"
                        value={form.next}
                        onChange={handleChange("next")}
                        required
                        autoComplete="new-password"
                        placeholder="Щонайменше 8 символів"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Повторіть новий пароль
                    </label>

                    <Input
                        type="password"
                        value={form.confirmation}
                        onChange={handleChange("confirmation")}
                        required
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className={inputClass}
                    />
                </div>

                {errorMessage && (
                    <p className="rounded-button bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {errorMessage}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-fit rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Збереження..." : "Змінити пароль"}
                </Button>
            </form>
        </section>
    );
}
