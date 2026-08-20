"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import { RxCheck, RxCross2, RxTrash } from "react-icons/rx";
import {
    approveTestimonial,
    deleteTestimonial,
    getTestimonials,
    rejectTestimonial,
} from "../../services/testimonialsService";
import { getApiErrorMessage } from "../../utils/apiError";
import {
    TESTIMONIAL_STATUS,
    TESTIMONIAL_STATUS_LABELS,
    testimonialStatusClass,
    testimonialStatusLabel,
} from "../../constants/testimonials";
import SelectField from "../../components/ui/SelectField";

function formatDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);

    // За замовчуванням показуємо саме те, заради чого сюди заходять —
    // нерозглянуті відгуки.
    const [status, setStatus] = useState(String(TESTIMONIAL_STATUS.Pending));

    // Змінюється після кожної дії й змушує ефект перечитати список.
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        // Прапорець проти оновлення стану вже прибраного компонента.
        let isActive = true;

        getTestimonials(status)
            .then((data) => {
                if (isActive) setTestimonials(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                if (!isActive) return;

                console.error("Failed to load testimonials:", error);
                toast.error(getApiErrorMessage(error, "Не вдалося завантажити відгуки."));
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [status, reloadKey]);

    /**
     * Спільна обгортка для трьох дій. Кожна з них однаково: блокує кнопки саме
     * цієї картки, показує підсумок і перезавантажує список.
     */
    const runAction = async (id, action, successMessage, failureMessage) => {
        try {
            setBusyId(id);

            await action();

            toast.success(successMessage);
            setReloadKey((key) => key + 1);
        } catch (error) {
            console.error(failureMessage, error);
            toast.error(getApiErrorMessage(error, failureMessage));
        } finally {
            setBusyId(null);
        }
    };

    const handleApprove = (testimonial) =>
        runAction(
            testimonial.id,
            () => approveTestimonial(testimonial.id),
            "Відгук опубліковано.",
            "Не вдалося опублікувати відгук."
        );

    const handleReject = (testimonial) => {
        const note = window.prompt(
            "Причина відхилення (побачить автор). Можна лишити порожнім:",
            testimonial.moderationNote ?? ""
        );

        // prompt повертає null, якщо натиснули «Скасувати» — це не порожня
        // причина, а відмова від дії, тому нічого не робимо.
        if (note === null) return;

        return runAction(
            testimonial.id,
            () => rejectTestimonial(testimonial.id, note.trim() || null),
            "Відгук відхилено.",
            "Не вдалося відхилити відгук."
        );
    };

    const handleDelete = (testimonial) => {
        const confirmed = window.confirm(
            `Видалити відгук від «${testimonial.authorName}»? Після цього клієнт зможе написати новий.`
        );

        if (!confirmed) return;

        return runAction(
            testimonial.id,
            () => deleteTestimonial(testimonial.id),
            "Відгук видалено.",
            "Не вдалося видалити відгук."
        );
    };

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Testimonials
                        </p>

                        <h2 className="font-heading text-4xl font-bold text-brand-ink">
                            Відгуки клієнтів
                        </h2>

                        <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                            На сайті показуються лише схвалені відгуки. Нерозглянуті
                            видно тільки тут.
                        </p>
                    </div>

                    <SelectField
                        value={status}
                        onChange={(event) => {
                            setIsLoading(true);
                            setStatus(event.target.value);
                        }}
                        className="min-h-11 lg:w-56"
                    >
                        <option value="">Усі стани</option>

                        {Object.entries(TESTIMONIAL_STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </SelectField>
                </div>
            </section>

            {isLoading && (
                <p className="rounded-card border border-brand-border bg-white p-8 text-brand-muted shadow-soft">
                    Завантаження…
                </p>
            )}

            {!isLoading && testimonials.length === 0 && (
                <p className="rounded-card border border-brand-border bg-white p-8 text-brand-muted shadow-soft">
                    Відгуків у цьому стані немає.
                </p>
            )}

            {!isLoading &&
                testimonials.map((testimonial) => {
                    const isBusy = busyId === testimonial.id;

                    return (
                        <section
                            key={testimonial.id}
                            className="rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8"
                        >
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="font-heading text-xl font-bold text-brand-ink">
                                    {testimonial.authorName}
                                </p>

                                {testimonial.authorRole && (
                                    <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                                        {testimonial.authorRole}
                                    </span>
                                )}

                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${testimonialStatusClass(
                                        testimonial.status
                                    )}`}
                                >
                                    {testimonialStatusLabel(testimonial.status)}
                                </span>

                                <span className="text-sm text-brand-gothic">
                                    надіслано {formatDate(testimonial.createdAtUtc)}
                                </span>
                            </div>

                            <blockquote className="mt-5 max-w-3xl border-l-4 border-brand-border pl-5 leading-7 text-brand-ink">
                                {testimonial.content}
                            </blockquote>

                            {testimonial.moderationNote && (
                                <p className="mt-4 max-w-3xl rounded-button bg-brand-pampas px-4 py-3 text-sm leading-6 text-brand-muted">
                                    <span className="font-semibold">Причина відхилення: </span>
                                    {testimonial.moderationNote}
                                </p>
                            )}

                            <div className="mt-6 flex flex-wrap gap-3">
                                {testimonial.status !== TESTIMONIAL_STATUS.Approved && (
                                    <Button
                                        onClick={() => handleApprove(testimonial)}
                                        disabled={isBusy}
                                        className="inline-flex items-center gap-2 rounded-button bg-brand-madison px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <RxCheck className="size-4" />
                                        Опублікувати
                                    </Button>
                                )}

                                {testimonial.status !== TESTIMONIAL_STATUS.Rejected && (
                                    <Button
                                        onClick={() => handleReject(testimonial)}
                                        disabled={isBusy}
                                        className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-pampas disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <RxCross2 className="size-4" />
                                        Відхилити
                                    </Button>
                                )}

                                <Button
                                    onClick={() => handleDelete(testimonial)}
                                    disabled={isBusy}
                                    className="inline-flex items-center gap-2 rounded-button border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <RxTrash className="size-4" />
                                    Видалити
                                </Button>
                            </div>
                        </section>
                    );
                })}
        </div>
    );
}
