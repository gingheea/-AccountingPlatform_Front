"use client";

import { Button, Input } from "@relume_io/relume-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginRequest} from "../../services/authService.js";
import {useAuth} from "../../hooks/useAuth.js";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (field) => (event) => {
        setForm((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage("");

        try {
            setIsSubmitting(true);

            const accessToken = await loginRequest(
                form.email.trim(),
                form.password
            );

            login(accessToken);

            navigate("/admin", { replace: true });
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response?.status === 401) {
                setErrorMessage("Невірний email або пароль.");
                return;
            }

            setErrorMessage("Не вдалося увійти. Спробуйте ще раз.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-brand-pampas px-[5%] py-16 md:py-24">
            <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
                <div className="w-full max-w-md rounded-card border border-brand-border bg-white p-8 shadow-card md:p-10">
                    <div className="mb-8 text-center">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Admin
                        </p>

                        <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                            Вхід в адмін-панель
                        </h1>

                        <p className="mt-4 leading-7 text-brand-muted">
                            Увійдіть, щоб керувати послугами, тарифами та заявками
                            клієнтів.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Email
                            </label>

                            <Input
                                type="email"
                                value={form.email}
                                onChange={handleChange("email")}
                                required
                                placeholder="admin@example.com"
                                className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Пароль
                            </label>

                            <Input
                                type="password"
                                value={form.password}
                                onChange={handleChange("password")}
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
                            {isSubmitting ? "Вхід..." : "Увійти"}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-xs leading-5 text-brand-muted">
                        Доступ лише для адміністратора сайту.
                    </p>
                </div>
            </div>
        </section>
    );
}