"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input, Textarea } from "@relume_io/relume-ui";
import {
    getMyTestimonial,
    submitMyTestimonial,
} from "../../services/testimonialsService";
import {
    TESTIMONIAL_MAX_LENGTH,
    TESTIMONIAL_MIN_LENGTH,
    TESTIMONIAL_STATUS,
    testimonialStatusClass,
    testimonialStatusLabel,
} from "../../constants/testimonials";
import { getApiErrorMessage } from "../../utils/apiError";

const inputClass =
    "min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison";

/** Пояснення під заголовком, різне для кожного стану розгляду. */
const STATUS_HINTS = {
    [TESTIMONIAL_STATUS.Pending]:
        "Відгук надіслано. Він з'явиться на сайті після того, як бухгалтер його перегляне.",
    [TESTIMONIAL_STATUS.Approved]:
        "Відгук опубліковано на сайті. Щоб змінити текст, зверніться до бухгалтера.",
    [TESTIMONIAL_STATUS.Rejected]:
        "Відгук відхилено. Ви можете виправити текст і надіслати його ще раз.",
};

export default function PortalTestimonialPage() {
    const [testimonial, setTestimonial] = useState(null);
    const [content, setContent] = useState("");
    const [authorRole, setAuthorRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isActive = true;

        getMyTestimonial()
            .then((data) => {
                if (!isActive) return;

                setTestimonial(data);
                setContent(data?.content ?? "");
                setAuthorRole(data?.authorRole ?? "");
            })
            .catch((error) => {
                if (!isActive) return;

                console.error("Failed to load testimonial:", error);
                toast.error("Не вдалося завантажити ваш відгук.");
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, []);

    // Опублікований відгук редагувати не можна — це правило стоїть і в домені,
    // на сервері. Тут ми лише не показуємо форму, щоб не вести до відмови.
    const isLocked = testimonial?.status === TESTIMONIAL_STATUS.Approved;

    const trimmedLength = content.trim().length;
    const isTooShort = trimmedLength < TESTIMONIAL_MIN_LENGTH;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (isTooShort) {
            setErrorMessage(
                `Відгук має містити щонайменше ${TESTIMONIAL_MIN_LENGTH} символів.`
            );
            return;
        }

        try {
            setIsSubmitting(true);

            await submitMyTestimonial({
                content: content.trim(),
                authorRole: authorRole.trim() || null,
            });

            const updated = await getMyTestimonial();

            setTestimonial(updated);
            toast.success("Дякуємо! Відгук надіслано на розгляд.");
        } catch (error) {
            console.error("Failed to submit testimonial:", error);
            setErrorMessage(getApiErrorMessage(error, "Не вдалося надіслати відгук."));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">Завантаження…</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Feedback
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <h2 className="font-heading text-4xl font-bold text-brand-ink">
                        Мій відгук
                    </h2>

                    {testimonial && (
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${testimonialStatusClass(
                                testimonial.status
                            )}`}
                        >
                            {testimonialStatusLabel(testimonial.status)}
                        </span>
                    )}
                </div>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    {testimonial
                        ? STATUS_HINTS[testimonial.status]
                        : "Поділіться враженнями від співпраці. Після перегляду бухгалтером відгук з'явиться на сайті."}
                </p>

                {testimonial?.status === TESTIMONIAL_STATUS.Rejected &&
                    testimonial.moderationNote && (
                        <p className="mt-4 max-w-2xl rounded-button bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                            <span className="font-semibold">Причина: </span>
                            {testimonial.moderationNote}
                        </p>
                    )}
            </section>

            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                {isLocked ? (
                    <blockquote className="max-w-2xl border-l-4 border-brand-madison pl-5 font-heading text-2xl font-semibold leading-snug text-brand-ink">
                        “{testimonial.content}”
                    </blockquote>
                ) : (
                    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Ваш відгук
                            </label>

                            <Textarea
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                maxLength={TESTIMONIAL_MAX_LENGTH}
                                rows={6}
                                placeholder="Що вам було найкориснішим у співпраці?"
                                className="rounded-card border-brand-border bg-brand-pampas p-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                            />

                            <p className="mt-2 text-sm text-brand-gothic">
                                {trimmedLength} / {TESTIMONIAL_MAX_LENGTH} символів
                                {isTooShort &&
                                    ` — ще щонайменше ${TESTIMONIAL_MIN_LENGTH - trimmedLength}`}
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-brand-ink">
                                Рід занять{" "}
                                <span className="font-normal text-brand-gothic">
                                    (необов'язково)
                                </span>
                            </label>

                            <Input
                                value={authorRole}
                                onChange={(event) => setAuthorRole(event.target.value)}
                                maxLength={100}
                                placeholder="ФОП, власниця магазину, директор ТОВ…"
                                className={inputClass}
                            />
                        </div>

                        {errorMessage && (
                            <p className="rounded-button bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {errorMessage}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting || isTooShort}
                            className="mt-2 w-fit rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting
                                ? "Надсилання..."
                                : testimonial
                                    ? "Надіслати виправлений відгук"
                                    : "Надіслати відгук"}
                        </Button>
                    </form>
                )}
            </section>
        </div>
    );
}
