"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import { RxTrash } from "react-icons/rx";
import {
    addPeriodTask,
    createReportingPeriod,
    deleteReportingPeriod,
    getAllActiveTemplates,
    getReportingPeriod,
    getReportingPeriods,
    removePeriodTask,
    setPeriodClosed,
    setPeriodTaskDone,
} from "../../services/reportingPeriodsService";
import { getAllUsers } from "../../services/usersService";
import { getApiErrorMessage } from "../../utils/apiError";
import {
    PERIOD_STATUS_LABELS,
    formatDueDate,
    daysUntil,
    periodStatusClass,
    periodStatusLabel,
    periodTitle,
} from "../../constants/periods";
import CreatePeriodModal from "../../components/admin/periods/CreatePeriodModal";
import PeriodDetailsModal from "../../components/admin/periods/PeriodDetailsModal";
import ProgressBar from "../../components/ui/ProgressBar";
import Pagination from "../../components/ui/Pagination";
import SelectField from "../../components/ui/SelectField";
import { usePagedList } from "../../hooks/usePagedList";

export default function ReportingPeriodsAdminPage() {
    const [users, setUsers] = useState([]);
    const [templates, setTemplates] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [selected, setSelected] = useState(null);
    const [busyTaskId, setBusyTaskId] = useState(null);

    const list = usePagedList(getReportingPeriods, {
        initialFilters: { userId: "", status: "" },
        onError: (error) =>
            toast.error(getApiErrorMessage(error, "Не вдалося завантажити періоди.")),
    });

    useEffect(() => {
        // Reference data for the client column and the pickers. Fetched whole,
        // because a partial list would leave rows showing a dash instead of a name.
        async function loadReferences() {
            try {
                const [usersData, templatesData] = await Promise.all([
                    getAllUsers(),
                    getAllActiveTemplates(),
                ]);

                setUsers(usersData);
                setTemplates(templatesData);
            } catch (error) {
                console.error("Failed to load references:", error);
            }
        }

        loadReferences();
    }, []);

    const usersById = useMemo(
        () => Object.fromEntries(users.map((user) => [user.id, user])),
        [users]
    );

    const clientName = (userId) => {
        const user = usersById[userId];

        return user?.fullName || user?.email || "—";
    };

    const handleCreate = async (payload) => {
        try {
            setIsSubmitting(true);

            await createReportingPeriod(payload);

            toast.success("Період створено.");
            setIsCreateOpen(false);
            list.reload();
        } catch (error) {
            console.error("Failed to create period:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося створити період."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const openDetails = async (row) => {
        try {
            // The list row has counts only; the checklist itself comes from the
            // detail endpoint.
            setSelected(await getReportingPeriod(row.id));
        } catch (error) {
            console.error("Failed to open period:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося відкрити період."));
        }
    };

    /**
     * After any change the period is re-read from the server rather than patched
     * locally. The progress percentage is computed on the backend, so guessing it
     * here would risk showing a number the server disagrees with.
     */
    const refreshSelected = async () => {
        if (!selected) return;

        setSelected(await getReportingPeriod(selected.id));
        list.reload();
    };

    const handleToggleTask = async (task) => {
        try {
            setBusyTaskId(task.id);

            await setPeriodTaskDone(selected.id, task.id, !task.isDone);
            await refreshSelected();
        } catch (error) {
            console.error("Failed to change task:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося змінити крок."));
        } finally {
            setBusyTaskId(null);
        }
    };

    const handleAddTask = async (title) => {
        try {
            await addPeriodTask(selected.id, title);
            await refreshSelected();
        } catch (error) {
            console.error("Failed to add task:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося додати крок."));
        }
    };

    const handleRemoveTask = async (task) => {
        try {
            await removePeriodTask(selected.id, task.id);
            await refreshSelected();
        } catch (error) {
            console.error("Failed to remove task:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити крок."));
        }
    };

    const handleSetClosed = async (close) => {
        try {
            await setPeriodClosed(selected.id, close);

            toast.success(close ? "Період закрито." : "Період відкрито знову.");
            await refreshSelected();
        } catch (error) {
            console.error("Failed to change period state:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося змінити стан періоду."));
        }
    };

    const handleDelete = async (row) => {
        const confirmed = window.confirm(
            `Видалити період «${periodTitle(row)}» для ${clientName(row.userId)}?\n\n` +
            "Разом з ним зникнуть усі його кроки. Цю дію не можна скасувати."
        );

        if (!confirmed) return;

        try {
            await deleteReportingPeriod(row.id);

            toast.success("Період видалено.");
            list.reloadAfterRemoval();
        } catch (error) {
            console.error("Failed to delete period:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося видалити період."));
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Periods
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Звітні періоди
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Місяць або квартал по кожному клієнту з чеклистом кроків.
                        Прогрес видно клієнту в його кабінеті.
                    </p>
                </div>

                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Створити період
                </Button>
            </div>

            <div className="mb-6 flex flex-col gap-3 rounded-card border border-brand-border bg-white p-4 shadow-soft lg:flex-row lg:items-center">
                <SelectField
                    value={list.filters.userId}
                    onChange={(event) => list.setFilter("userId", event.target.value)}
                    className="min-h-11 lg:w-64"
                >
                    <option value="">Усі клієнти</option>

                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.fullName || user.email}
                        </option>
                    ))}
                </SelectField>

                <SelectField
                    value={list.filters.status}
                    onChange={(event) => list.setFilter("status", event.target.value)}
                    className="min-h-11 lg:w-48"
                >
                    <option value="">Усі стани</option>

                    {Object.entries(PERIOD_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </SelectField>

                <p className="whitespace-nowrap text-sm text-brand-muted lg:pl-2">
                    Знайдено: {list.total}
                </p>
            </div>

            {list.isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження періодів...</p>
                </div>
            ) : list.items.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Періодів ще немає
                    </h3>

                    <p className="mt-3 text-brand-muted">
                        Створіть перший — для цього потрібен хоча б один активний шаблон.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px] text-left">
                            <thead className="border-b border-brand-border bg-brand-pampas">
                            <tr>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Клієнт</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Період</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Прогрес</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Дедлайн</th>
                                <th className="px-5 py-4 text-sm font-semibold text-brand-ink">Стан</th>
                                <th className="px-5 py-4 text-right text-sm font-semibold text-brand-ink">Дії</th>
                            </tr>
                            </thead>

                            <tbody>
                            {list.items.map((row) => {
                                const left = daysUntil(row.dueDate);

                                return (
                                    <tr key={row.id} className="border-b border-brand-border last:border-b-0">
                                        <td className="px-5 py-5 font-semibold text-brand-ink">
                                            {clientName(row.userId)}
                                        </td>

                                        <td className="px-5 py-5 text-sm text-brand-ink">
                                            {periodTitle(row)}
                                        </td>

                                        <td className="w-56 px-5 py-5">
                                            <ProgressBar
                                                percent={row.progressPercent}
                                                label={`${row.doneCount} з ${row.taskCount}`}
                                                tone={row.progressPercent === 100 ? "done" : "default"}
                                            />
                                        </td>

                                        <td className="px-5 py-5 text-sm">
                                            <p className="text-brand-ink">{formatDueDate(row.dueDate)}</p>

                                            {/* The warning is only meaningful while work is
                                                still going on: a closed period cannot be late. */}
                                            {row.status !== 2 && left !== null && left <= 7 && (
                                                <p
                                                    className={`mt-1 text-xs font-semibold ${
                                                        left < 0 ? "text-red-700" : "text-yellow-700"
                                                    }`}
                                                >
                                                    {left < 0
                                                        ? `Прострочено на ${Math.abs(left)} дн.`
                                                        : left === 0
                                                            ? "Сьогодні"
                                                            : `Лишилось ${left} дн.`}
                                                </p>
                                            )}
                                        </td>

                                        <td className="px-5 py-5">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${periodStatusClass(
                                                    row.status
                                                )}`}
                                            >
                                                {periodStatusLabel(row.status)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openDetails(row)}
                                                    className="inline-flex items-center rounded-button border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                                                >
                                                    Відкрити
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(row)}
                                                    aria-label="Видалити період"
                                                    className="inline-flex items-center rounded-button border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                                                >
                                                    <RxTrash className="size-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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

            {isCreateOpen && (
            <CreatePeriodModal
                users={users}
                templates={templates}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreate}
                isSubmitting={isSubmitting}
            />
            )}

            {selected && (
            <PeriodDetailsModal
                period={selected}
                clientName={selected ? clientName(selected.userId) : ""}
                onClose={() => setSelected(null)}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onRemoveTask={handleRemoveTask}
                onSetClosed={handleSetClosed}
                busyTaskId={busyTaskId}
            />
            )}
        </section>
    );
}
