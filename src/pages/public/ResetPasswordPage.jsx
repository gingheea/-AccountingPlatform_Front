"use client";

import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input } from "@relume_io/relume-ui";
import toast from "react-hot-toast";
import { resetPassword } from "../../services/authService";
import { getApiErrorMessage } from "../../utils/apiError";

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Пошта й код приходять у посиланні з листа.
    const email = searchParams.get("email") ?? "";
    const token = searchParams.get("token") ?? "";

    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isLinkBroken = !email || !token;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (password.length < 8) {
            setErrorMessage("Пароль має містити щонайменше 8 символів.");
            return;
        }

        // Друге поле — щоб людина не зберегла пароль із випадковою помилкою
        // й одразу не змогла увійти. Перевіряємо на фронті: беку це не потрібно.
        if (password !== confirmation) {
            setErrorMessage("Паролі не збігаються.");
            return;
        }

        try {
            setIsSubmitting(true);

            await resetPassword(email, token, password);

            toast.success("Пароль змінено. Увійдіть із новим паролем.");
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Failed to reset password:", error);
            setErrorMessage(getApiErrorMessage(error, "Не вдалося змінити пароль."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-brand-pampas px-[5%] py-16 md:py-24">
            <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
                <div className="w-full max-w-md rounded-card border border-brand-border bg-white p-8 shadow-card md:p-10">
                    {isLinkBroken ? (
                        <div className="text-center">
                            <h1 className="font-heading text-3xl font-bold text-brand-ink">
                                Посилання неповне
                            </h1>

                            <p className="mt-4 leading-7 text-brand-muted">
                                Схоже, адреса скопійована не повністю. Відкрийте
                                посилання з листа ще раз або запросіть нове.
                            </p>

                            <Link
                                to="/forgot-password"
                                className="mt-6 inline-flex rounded-button bg-brand-madison px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-madisonDark"
                            >
                                Запросити нове посилання
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 text-center">
                                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                                    Новий пароль
                                </p>

                                <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink">
                                    Встановіть пароль
                                </h1>

                                <p className="mt-4 break-all leading-7 text-brand-muted">
                                    Для акаунта {email}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                        Новий пароль
                                    </label>

                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                        placeholder="Щонайменше 8 символів"
                                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                        Повторіть пароль
                                    </label>

                                    <Input
                                        type="password"
                                        value={confirmation}
                                        onChange={(event) => setConfirmation(event.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
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
                                    className="mt-2 w-full rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? "Збереження..." : "Зберегти пароль"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
