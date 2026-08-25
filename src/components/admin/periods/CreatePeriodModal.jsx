"use client";

import { useMemo, useState } from "react";
import { Button, Input } from "@relume_io/relume-ui";
import { RxCross2 } from "react-icons/rx";
import SelectField from "../../ui/SelectField";
import { periodKindLabel, periodNumberOptions } from "../../../constants/periods";

const inputClass =
    "min-h-11 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison";

/** Today's date as yyyy-mm-dd, which is what <input type="date"> expects. */
function todayIso() {
    return new Date().toISOString().slice(0, 10);
}

export default function CreatePeriodModal({
                                              users,
                                              templates,
                                              onClose,
                                              onSubmit,
                                              isSubmitting,
                                          }) {
    // Mounted only while open, so these initial values are the reset.
    const [form, setForm] = useState(() => ({
        userId: "",
        templateId: "",
        year: new Date().getFullYear(),
        number: 1,
        dueDate: todayIso(),
    }));

    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Which template this period will actually be built from: the one picked by
     * hand, or the client's default when nothing is picked.
     *
     * Resolving it here matters because the periodicity comes from the template.
     * Guessing "monthly" instead used to show months for a quarterly client, so
     * choosing "January" quietly created Q1 — the label said one thing and the
     * period was another.
     */
    const effectiveTemplate = useMemo(() => {
        if (form.templateId)
            return templates.find((x) => x.id === form.templateId) ?? null;

        const client = users.find((x) => x.id === form.userId);

        if (!client?.defaultChecklistTemplateId) return null;

        return templates.find((x) => x.id === client.defaultChecklistTemplateId) ?? null;
    }, [templates, users, form.templateId, form.userId]);

    // Until a template is known the periodicity is unknown too, so the period
    // picker stays disabled rather than offering a guess.
    const kind = effectiveTemplate?.kind ?? null;

    const numberOptions = useMemo(
        () => (kind === null ? [] : periodNumberOptions(kind)),
        [kind]
    );

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!form.userId) {
            setErrorMessage("Оберіть клієнта.");
            return;
        }

        if (!effectiveTemplate) {
            setErrorMessage(
                "Не зрозуміло, за яким шаблоном створювати період. Оберіть шаблон вручну " +
                "або призначте клієнту типовий у розділі Users."
            );
            return;
        }

        await onSubmit({
            userId: form.userId,
            // Empty means "use the client's default", which the backend resolves.
            templateId: form.templateId || null,
            year: Number(form.year),
            number: Number(form.number),
            dueDate: form.dueDate,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-ink/40 px-4 py-8">
            <div className="w-full max-w-xl rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Period
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            Новий звітний період
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 shrink-0 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Клієнт *
                        </label>

                        <SelectField
                            value={form.userId}
                            onChange={(event) =>
                                // The new client may run on a different periodicity, so the
                                // number goes back to 1 rather than staying on "December".
                                setForm((prev) => ({
                                    ...prev,
                                    userId: event.target.value,
                                    number: 1,
                                }))
                            }
                            className="min-h-11"
                        >
                            <option value="">Оберіть клієнта</option>

                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.fullName || user.email}
                                </option>
                            ))}
                        </SelectField>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Шаблон
                        </label>

                        <SelectField
                            value={form.templateId}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    templateId: event.target.value,
                                    // Switching between monthly and quarterly can leave
                                    // the number out of range, so it goes back to 1.
                                    number: 1,
                                }))
                            }
                            className="min-h-11"
                        >
                            <option value="">Типовий шаблон клієнта</option>

                            {templates.map((template) => (
                                <option key={template.id} value={template.id}>
                                    {template.name}
                                </option>
                            ))}
                        </SelectField>

                        {/* Says out loud which template and which periodicity will
                            actually be used, so the period picker below is never a
                            surprise. */}
                        {!form.userId ? (
                            <p className="mt-2 text-xs leading-5 text-brand-gothic">
                                Спершу оберіть клієнта.
                            </p>
                        ) : effectiveTemplate ? (
                            <p className="mt-2 text-xs leading-5 text-brand-gothic">
                                Буде використано <span className="font-semibold">{effectiveTemplate.name}</span>
                                {" — "}
                                {periodKindLabel(effectiveTemplate.kind).toLowerCase()}
                                {!form.templateId && " (типовий для клієнта)"}
                            </p>
                        ) : (
                            <p className="mt-2 rounded-button bg-yellow-50 px-3 py-2 text-xs leading-5 text-yellow-800">
                                У цього клієнта не задано типового шаблону. Оберіть шаблон
                                вручну або призначте типовий у розділі Users.
                            </p>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Рік *
                            </label>

                            <Input
                                type="number"
                                value={form.year}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, year: event.target.value }))
                                }
                                required
                                min={2000}
                                max={2100}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Період *
                            </label>

                            <SelectField
                                value={String(form.number)}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, number: event.target.value }))
                                }
                                className="min-h-11"
                                disabled={kind === null}
                            >
                                {kind === null ? (
                                    <option value="">Оберіть шаблон</option>
                                ) : (
                                    numberOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                )}
                            </SelectField>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Дедлайн *
                            </label>

                            <Input
                                type="date"
                                value={form.dueDate}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, dueDate: event.target.value }))
                                }
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="rounded-button bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {errorMessage}
                        </p>
                    )}

                    <div className="mt-2 flex flex-wrap justify-end gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="rounded-button border border-brand-border bg-white px-5 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                        >
                            Скасувати
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-button bg-brand-madison px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Створення..." : "Створити"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
