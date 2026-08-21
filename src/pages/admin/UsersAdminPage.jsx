"use client";

import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxMagnifyingGlass } from "react-icons/rx";
import {
    activateUser,
    changeUserRoles,
    createUser,
    deactivateUser,
    deleteUser,
    getUsers,
    resetUserPassword,
    updateUser,
} from "../../services/usersService";
import UsersTable from "../../components/admin/users/UsersTable";
import UserFormModal from "../../components/admin/users/UserFormModal";
import ResetPasswordModal from "../../components/admin/users/ResetPasswordModal";
import { getApiErrorMessage } from "../../utils/apiError";
import { useAuth } from "../../hooks/useAuth";
import SelectField from "../../components/ui/SelectField";
import Pagination from "../../components/ui/Pagination";
import { usePagedList } from "../../hooks/usePagedList";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

export default function UsersAdminPage() {
    // The current admin's email, so they are not offered a "delete yourself" button.
    const { email } = useAuth();

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

    // What is being typed and what has already gone to the server differ.
    // The request fires only once the user has stopped.
    const [searchInput, setSearchInput] = useState("");
    const search = useDebouncedValue(searchInput);

    const list = usePagedList(getUsers, {
        initialFilters: { search: "", isActive: "" },
        onError: () => toast.error("Не вдалося завантажити користувачів."),
    });

    const { setFilter } = list;

    // Search now runs on the server, so the changed text is handed to the list.
    // This is not a synchronous setState in an effect body: the value has settled.
    React.useEffect(() => {
        setFilter("search", search);
    }, [search, setFilter]);

    const users = list.items;
    const isLoading = list.isLoading;
    const statusFilter =
        list.filters.isActive === "" ? "all" : list.filters.isActive ? "active" : "inactive";

    const loadUsers = list.reload;

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
            loadUsers();
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

            loadUsers();
        } catch (error) {
            console.error("Failed to change user status:", error);
            toast.error("Не вдалося змінити статус користувача.");
        }
    };

    const handleDelete = async (user) => {
        // Deletion cannot be undone, so we ask for confirmation and spell out
        // exactly what disappears along with the account.
        const confirmed = window.confirm(
            `Видалити користувача «${user.fullName || user.email}»?\n\n` +
            "Разом з ним будуть видалені його документи, обслуговування та відгук. " +
            "Заявки залишаться в історії, але втратять звʼязок із клієнтом.\n\n" +
            "Цю дію не можна скасувати."
        );

        if (!confirmed) return;

        try {
            await deleteUser(user.id);

            toast.success("Користувача видалено.");
            list.reloadAfterRemoval();
        } catch (error) {
            console.error("Failed to delete user:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити користувача."));
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

            // Show what the server actually said: "the password must contain a digit"
            // is far more useful than a generic "it failed".
            toast.error(getApiErrorMessage(error, "Не вдалося змінити пароль."));
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

            <div className="mb-6 flex flex-col gap-3 rounded-card border border-brand-border bg-white p-4 shadow-soft lg:flex-row lg:items-center">
                <div className="relative flex-1">
                    <RxMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-gothic" />

                    <Input
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        placeholder="Пошук за іменем, поштою, Tax ID або роллю"
                        className="min-h-11 w-full rounded-button border-brand-border bg-brand-pampas pl-11 pr-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <SelectField
                    value={statusFilter}
                    onChange={(event) => {
                        const value = event.target.value;

                        setFilter("isActive", value === "all" ? "" : value === "active");
                    }}
                    className="min-h-11 lg:w-48"
                >
                    <option value="all">Усі статуси</option>
                    <option value="active">Тільки активні</option>
                    <option value="inactive">Тільки неактивні</option>
                </SelectField>

                <p className="whitespace-nowrap text-sm text-brand-muted lg:pl-2">
                    Знайдено: {list.total}
                </p>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">
                        Завантаження користувачів...
                    </p>
                </div>
            ) : (
                <>
                <UsersTable
                    users={users}
                    onEdit={openEditModal}
                    onToggleActive={handleToggleActive}
                    onResetPassword={openResetPasswordModal}
                    onDelete={handleDelete}
                    currentUserEmail={email}
                    isFiltered={search.trim() !== "" || statusFilter !== "all"}
                />

                <Pagination
                    page={list.page}
                    pageSize={list.pageSize}
                    total={list.total}
                    onPageChange={list.changePage}
                    onPageSizeChange={list.changePageSize}
                />
                </>
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