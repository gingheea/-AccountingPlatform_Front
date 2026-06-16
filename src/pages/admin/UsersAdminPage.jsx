"use client";

import { Button } from "@relume_io/relume-ui";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    activateUser,
    changeUserRoles,
    createUser,
    deactivateUser,
    getUsers,
    resetUserPassword,
    updateUser,
} from "../../services/usersService";
import UsersTable from "../../components/admin/users/UsersTable";
import UserFormModal from "../../components/admin/users/UserFormModal";
import ResetPasswordModal from "../../components/admin/users/ResetPasswordModal";

export default function UsersAdminPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formModalState, setFormModalState] = useState({
        isOpen: false,
        mode: "create",
        user: null,
    });

    const [passwordModalState, setPasswordModalState] = useState({
        isOpen: false,
        user: null,
    });

    async function loadUsers() {
        try {
            setIsLoading(true);

            const data = await getUsers();

            setUsers(
                [...data].sort(
                    (a, b) =>
                        new Date(b.createdAtUtc).getTime() -
                        new Date(a.createdAtUtc).getTime()
                )
            );
        } catch (error) {
            console.error("Failed to load users:", error);
            toast.error("Не вдалося завантажити користувачів.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const openCreateModal = () => {
        setFormModalState({
            isOpen: true,
            mode: "create",
            user: null,
        });
    };

    const openEditModal = (user) => {
        setFormModalState({
            isOpen: true,
            mode: "edit",
            user,
        });
    };

    const closeFormModal = () => {
        setFormModalState({
            isOpen: false,
            mode: "create",
            user: null,
        });
    };

    const openResetPasswordModal = (user) => {
        setPasswordModalState({
            isOpen: true,
            user,
        });
    };

    const closeResetPasswordModal = () => {
        setPasswordModalState({
            isOpen: false,
            user: null,
        });
    };

    const handleSubmit = async (payload) => {
        try {
            setIsSubmitting(true);

            if (formModalState.mode === "edit" && formModalState.user) {
                const { roles, ...updatePayload } = payload;

                await updateUser(formModalState.user.id, updatePayload);
                await changeUserRoles(formModalState.user.id, roles);

                toast.success("Користувача оновлено.");
            } else {
                await createUser(payload);
                toast.success("Користувача створено.");
            }

            closeFormModal();
            await loadUsers();
        } catch (error) {
            console.error("Failed to save user:", error);
            toast.error("Не вдалося зберегти користувача.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleActive = async (user) => {
        try {
            if (user.isActive) {
                await deactivateUser(user.id);
                toast.success("Користувача деактивовано.");
            } else {
                await activateUser(user.id);
                toast.success("Користувача активовано.");
            }

            await loadUsers();
        } catch (error) {
            console.error("Failed to change user status:", error);
            toast.error("Не вдалося змінити статус користувача.");
        }
    };

    const handleResetPassword = async (id, newPassword) => {
        try {
            setIsSubmitting(true);

            await resetUserPassword(id, newPassword);

            toast.success("Пароль змінено.");
            closeResetPasswordModal();
        } catch (error) {
            console.error("Failed to reset password:", error);
            toast.error("Не вдалося змінити пароль.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Users
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Користувачі
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Керуйте користувачами, ролями, доступом і паролями для
                        адмін-панелі та майбутнього клієнтського порталу.
                    </p>
                </div>

                <Button
                    onClick={openCreateModal}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Створити користувача
                </Button>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">
                        Завантаження користувачів...
                    </p>
                </div>
            ) : (
                <UsersTable
                    users={users}
                    onEdit={openEditModal}
                    onToggleActive={handleToggleActive}
                    onResetPassword={openResetPasswordModal}
                />
            )}

            <UserFormModal
                isOpen={formModalState.isOpen}
                mode={formModalState.mode}
                user={formModalState.user}
                onClose={closeFormModal}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />

            <ResetPasswordModal
                isOpen={passwordModalState.isOpen}
                user={passwordModalState.user}
                onClose={closeResetPasswordModal}
                onSubmit={handleResetPassword}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}