"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import { RxPencil1, RxTrash } from "react-icons/rx";
import {
    createChecklistTemplate,
    deleteChecklistTemplate,
    getChecklistTemplate,
    getChecklistTemplates,
    setChecklistTemplateActive,
    updateChecklistTemplate,
} from "../../services/reportingPeriodsService";
import { getApiErrorMessage } from "../../utils/apiError";
import { periodKindLabel } from "../../constants/periods";
import ChecklistTemplateFormModal from "../../components/admin/periods/ChecklistTemplateFormModal";
import Pagination from "../../components/ui/Pagination";
import SelectField from "../../components/ui/SelectField";
import { usePagedList } from "../../hooks/usePagedList";

export default function ChecklistTemplatesAdminPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, template: null });

    const list = usePagedList(getChecklistTemplates, {
        initialFilters: { onlyActive: "" },
        onError: (error) =>
            toast.error(getApiErrorMessage(error, "Не вдалося завантажити шаблони.")),
    });

    const openCreate = () => setModal({ isOpen: true, template: null });

    const openEdit = async (row) => {
        try {
            // The list carries only a step count, so the full template is fetched
            // before editing — otherwise the form would open with no steps and
            // saving would wipe them.
            const template = await getChecklistTemplate(row.id);

            setModal({ isOpen: true, template });
        } catch (error) {
            console.error("Failed to load template:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося відкрити шаблон."));
        }
    };

    const closeModal = () => setModal({ isOpen: false, template: null });

    const handleSubmit = async (payload) => {
        try {
            setIsSubmitting(true);

            if (modal.template) {
                await updateChecklistTemplate(modal.template.id, payload);
                toast.success("Шаблон оновлено.");
            } else {
                await createChecklistTemplate(payload);
                toast.success("Шаблон створено.");
            }

            closeModal();
            list.reload();
        } catch (error) {
            console.error("Failed to save template:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося зберегти шаблон."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleActive = async (row) => {
        try {
            await setChecklistTemplateActive(row.id, !row.isActive);

            toast.success(row.isActive ? "Шаблон вимкнено." : "Шаблон увімкнено.");
            list.reload();
        } catch (error) {
            console.error("Failed to change template state:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося змінити стан шаблону."));
        }
    };

    const handleDelete = async (row) => {
        const confirmed = window.confirm(
            `Видалити шаблон «${row.name}»?\n\n` +
            "Уже створені періоди не постраждають — вони зберігають власну копію кроків."
        );

        if (!confirmed) return;

        try {
            await deleteChecklistTemplate(row.id);

            toast.success("Шаблон видалено.");
            list.reloadAfterRemoval();
        } catch (error) {
            console.error("Failed to delete template:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити шаблон."));
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Checklists
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Шаблони чеклистів
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Набори кроків, які повторюються щоперіоду. З них створюються
                        звітні періоди клієнтів — кроки копіюються, тож зміна шаблону
                        не зачіпає вже розпочату роботу.
                    </p>
                </div>

                <Button
                    onClick={openCreate}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Створити шаблон
                </Button>
            </div>

            <div className="mb-6 flex flex-col gap-3 rounded-card border border-brand-border bg-white p-4 shadow-soft lg:flex-row lg:items-center">
                <SelectField
                    value={String(list.filters.onlyActive)}
                    onChange={(event) =>
                        list.setFilter(
                            "onlyActive",
                            event.target.value === "" ? "" : event.target.value === "true"
                        )
                    }
                    className="min-h-11 lg:w-56"
                >
                    <option value="">Усі шаблони</option>
                    <option value="true">Тільки активні</option>
                </SelectField>

                <p className="whitespace-nowrap text-sm text-brand-muted lg:pl-2">
                    Знайдено: {list.total}
                </p>
            </div>

            {list.isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження шаблонів...</p>
                </div>
            ) : list.items.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Шаблонів ще немає
                    </h3>

                    <p className="mt-3 text-brand-muted">
                        Створіть перший — наприклад «ФОП 3 група без ПДВ».
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[820px] text-left">
                            <thead className="border-b border-brand-border bg-brand-pampas">
                            <tr>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Назва</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Періодичність</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Кроків</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Стан</th>
                                <th className="px-5 py-4 text-right text-sm font-semibold text-brand-ink">Дії</th>
                            </tr>
                            </thead>

                            <tbody>
                            {list.items.map((row) => (
                                <tr key={row.id} className="border-b border-brand-border last:border-b-0">
                                    <td className="px-5 py-5 font-semibold text-brand-ink">
                                        {row.name}
                                    </td>

                                    <td className="px-5 py-5 text-sm text-brand-muted">
                                        {periodKindLabel(row.kind)}
                                    </td>

                                    <td className="px-5 py-5 text-sm text-brand-muted">
                                        {row.itemCount}
                                    </td>

                                    <td className="px-5 py-5">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                row.isActive
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-brand-soft text-brand-gothic"
                                            }`}
                                        >
                                            {row.isActive ? "Активний" : "Вимкнений"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-5">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(row)}
                                                className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                                            >
                                                <RxPencil1 className="size-4" />
                                                Змінити
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleToggleActive(row)}
                                                className={`inline-flex items-center rounded-button border px-3 py-2 text-sm font-semibold transition-colors ${
                                                    row.isActive
                                                        ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                                        : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                                }`}
                                            >
                                                {row.isActive ? "Вимкнути" : "Увімкнути"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(row)}
                                                className="inline-flex items-center gap-2 rounded-button border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                                            >
                                                <RxTrash className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-5 pb-5">
                        <Pagination
                            page={list.page}
                            pageSize={list.pageSize}
                            total={list.total}
                            onPageChange={list.changePage}
                            onPageSizeChange={list.changePageSize}
                        />
                    </div>
                </div>
            )}

            {modal.isOpen && (
            <ChecklistTemplateFormModal
                template={modal.template}
                onClose={closeModal}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
            )}
        </section>
    );
}
