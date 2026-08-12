"use client";

import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RxExit, RxHome } from "react-icons/rx";
import {useAuth} from "../../hooks/useAuth.js";

const navItems = [
    {
        label: "Огляд",
        to: "/portal",
        end: true,
    },
    {
        label: "Заявки",
        to: "/portal/requests",
    },
    {
        label: "Документи",
        to: "/portal/documents",
    },
    {
        label: "Профіль",
        to: "/portal/profile",
    },
];

export default function PortalLayout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-brand-pampas">
            <header className="border-b border-brand-border bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-tan">
                            Client portal
                        </p>

                        <h1 className="font-heading text-2xl font-bold text-brand-ink">
                            Кабінет клієнта
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-button border border-brand-border px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-pampas"
                        >
                            <RxHome className="size-4" />
                            <span className="hidden sm:inline">На головну</span>
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 rounded-button border border-brand-border px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-pampas"
                        >
                            <RxExit className="size-4" />
                            <span className="hidden sm:inline">Вийти</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
                <aside className="h-fit rounded-card border border-brand-border bg-white p-4 shadow-soft">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    [
                                        "block rounded-button px-4 py-3 text-sm font-semibold transition",
                                        isActive
                                            ? "bg-brand-madison text-white"
                                            : "text-brand-muted hover:bg-brand-pampas hover:text-brand-ink",
                                    ].join(" ")
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* min-w-0 — без нього grid-колонка не може стиснутись вужче
                    за таблицю, і сторінка виїжджає за екран на мобільному. */}
                <main className="min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}