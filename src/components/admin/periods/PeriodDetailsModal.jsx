"use client";

import { useState } from "react";
import { Button, Input } from "@relume_io/relume-ui";
import { RxCheck, RxCross2, RxPlus, RxTrash } from "react-icons/rx";
import ProgressBar from "../../ui/ProgressBar";
import {
    PERIOD_STATUS,
    formatDueDate,
    periodStatusClass,
    periodStatusLabel,
    periodTitle,
} from "../../../constants/periods";

export default function PeriodDetailsModal({
                                               period,
                                               clientName,
                                               onClose,
                                               onToggleTask,
                                               onAddTask,
                                               onRemoveTask,
                                               onSetClosed,
                                               busyTaskId,
                                           }) {
    // Same as the other dialogs: the parent decides whether this exists at all,
    // so there is no isOpen check and no state left over from last time.
    const [newTitle, setNewTitle] = useState("");

    const isClosed = period.status === PERIOD_STATUS.Closed;

    const handleAdd = async (event) => {
        event.preventDefault();

        const title = newTitle.trim();
        if (!title) return;

        await onAddTask(title);
        setNewTitle("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-ink/40 px-4 py-8">
            <div className="w-full max-w-2xl rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            {clientName}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="font-heading text-3xl font-bold text-brand-ink">
                                {periodTitle(period)}
                            </h2>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-semibold ${periodStatusClass(
                                    period.status
                                )}`}
                            >
                                {periodStatusLabel(period.status)}
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-brand-muted">
                            Подати до {formatDueDate(period.dueDate)}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 shrink-0 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <div className="mb-6">
                    <ProgressBar
                        percent={period.progressPercent}
                        label={`Виконано ${period.tasks.filter((t) => t.isDone).length} з ${period.tasks.length}`}
                        tone={period.progressPercent === 100 ? "done" : "default"}
                    />
                </div>

                {isClosed && (
                    <p className="mb-5 rounded-button bg-brand-pampas px-4 py-3 text-sm leading-6 text-brand-muted">
                        Період закрито — кроки не редагуються. Щоб змінити щось, відкрийте
                        його знову.
                    </p>
                )}

                <ul className="grid gap-2">
                    {period.tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-center gap-3 rounded-card border border-brand-border bg-white px-4 py-3"
                        >
                            <button
                                type="button"
                                onClick={() => onToggleTask(task)}
                                disabled={isClosed || busyTaskId === task.id}
                                aria-label={task.isDone ? "Зняти відмітку" : "Відмітити виконаним"}
                                className={`flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                                    task.isDone
                                        ? "border-green-600 bg-green-600 text-white"
                                        : "border-brand-border bg-white text-transparent hover:border-brand-madison"
                                }`}
                            >
                                <RxCheck className="size-4" />
                            </button>

                            <span
                                className={`flex-1 text-sm ${
                                    task.isDone
                                        ? "text-brand-gothic line-through"
                                        : "text-brand-ink"
                                }`}
                            >
                                {task.title}
                            </span>

                            {!isClosed && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveTask(task)}
                                    aria-label="Видалити крок"
                                    className="flex size-8 shrink-0 items-center justify-center rounded-button text-red-700 transition-colors hover:bg-red-50"
                                >
                                    <RxTrash className="size-4" />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

                {!isClosed && (
                    <form onSubmit={handleAdd} className="mt-4 flex gap-2">
                        <Input
                            value={newTitle}
                            onChange={(event) => setNewTitle(event.target.value)}
                            maxLength={200}
                            placeholder="Додати крок, якого не було в шаблоні"
                            className="min-h-11 flex-1 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                        />

                        <Button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-4 py-2 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                        >
                            <RxPlus className="size-4" />
                            Додати
                        </Button>
                    </form>
                )}

                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-brand-border pt-5">
                    <Button
                        type="button"
                        onClick={() => onSetClosed(!isClosed)}
                        className={`rounded-button px-5 py-3 font-semibold shadow-soft transition-colors ${
                            isClosed
                                ? "border border-brand-border bg-white text-brand-madison hover:bg-brand-pampas"
                                : "bg-brand-madison text-white hover:bg-brand-madisonDark"
                        }`}
                    >
                        {isClosed ? "Відкрити знову" : "Закрити період"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
