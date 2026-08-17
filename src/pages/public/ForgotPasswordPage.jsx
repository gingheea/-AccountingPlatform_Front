"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@relume_io/relume-ui";
import { RxArrowLeft, RxEnvelopeClosed } from "react-icons/rx";
import { requestPasswordReset } from "../../services/authService";
import { getApiErrorMessage } from "../../utils/apiError";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!email.trim()) {
            setErrorMessage("Вкажіть адресу пошти.");
            return;
        }

        try {
            setIsSubmitting(true);

            await requestPasswordReset(email.trim());

            // Показуємо успіх завжди — навіть якщо такої пошти немає.
            // Інакше цією формою можна було б перевіряти чужі адреси.
            setIsSent(true);
        } catch (error) {
            console.error("Failed to request password reset:", error);
            setErrorMessage(getApiErrorMessage(error, "Не вдалося надіслати лист. Спробуйте пізніше."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-brand-pampas px-[5%] py-16 md:py-24">
            <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
                <div className="w-full max-w-md rounded-card border border-brand-border bg-white p-8 shadow-card md:p-10">
                    <Link
                        to="/login"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition-colors hover:text-brand-madison"
                    >
                        <RxArrowLeft className="size-4" />
                        До входу
                    </Link>

                    {isSent ? (
                        <div className="text-center">
                            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-brand-pampas text-brand-madison">
                                <RxEnvelopeClosed className="size-7" />
                            </div>

                            <h1 className="font-heading text-3xl font-bold text-brand-ink">
                                Перевірте пошту
                            </h1>

                            <p className="mt-4 leading-7 text-brand-muted">
                                Якщо акаунт з такою адресою існує, ми надіслали на неї
                                посилання для встановлення нового пароля. Воно діє
                                обмежений час і спрацює один раз.
                            </p>

                            <p className="mt-4 text-sm leading-6 text-brand-muted">
                                Не бачите листа? Загляньте в «Спам».
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8 text-center">
                                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                                    Відновлення
                                </p>

                                <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink">
                                    Забули пароль?
                                </h1>

                                <p className="mt-4 leading-7 text-brand-muted">
                                    Вкажіть пошту, якою ви входите. Надішлемо посилання
                                    для встановлення нового пароля.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                        Email
                                    </label>

                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                        placeholder="name@example.com"
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
                                    {isSubmitting ? "Надсилання..." : "Надіслати посилання"}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
