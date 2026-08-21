"use client";

import { useEffect, useState } from "react";
import { Button } from "@relume_io/relume-ui";
import { RxReload } from "react-icons/rx";
import { getPublishedTestimonials } from "../../services/testimonialsService";
import TestimonialCard from "../../components/shared/TestimonialCard";
import { TESTIMONIAL_TONES } from "../../constants/testimonials";

/** How many testimonials one click loads. */
const PAGE_SIZE = 9;

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Bumped by the retry button, restarting the initial load.
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let isActive = true;

        getPublishedTestimonials({ skip: 0, take: PAGE_SIZE })
            .then((page) => {
                if (!isActive) return;

                setTestimonials(page.items);
                setTotal(page.total);
            })
            .catch((error) => {
                if (!isActive) return;

                console.error("Failed to load testimonials:", error);
                setHasError(true);
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [reloadKey]);

    const handleLoadMore = async () => {
        try {
            setIsLoadingMore(true);

            // skip is derived from how many are already shown, so the next page
            // continues the list instead of starting it over.
            const page = await getPublishedTestimonials({
                skip: testimonials.length,
                take: PAGE_SIZE,
            });

            setTestimonials((current) => [...current, ...page.items]);
            setTotal(page.total);
        } catch (error) {
            console.error("Failed to load more testimonials:", error);
            setHasError(true);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const handleRetry = () => {
        setIsLoading(true);
        setHasError(false);
        setReloadKey((key) => key + 1);
    };

    const hasMore = testimonials.length < total;

    return (
        <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container">
                <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                        Відгуки
                    </p>

                    <h1 className="mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl">
                        Що кажуть клієнти
                    </h1>

                    <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
                        {total > 0
                            ? `Усі ${total} відгуків від підприємців і власників малого бізнесу, які довіряють мені облік і звітність.`
                            : "Відгуки від підприємців і власників малого бізнесу."}
                    </p>
                </div>

                {isLoading && (
                    <p className="text-center leading-7 text-brand-muted">Завантаження…</p>
                )}

                {!isLoading && hasError && testimonials.length === 0 && (
                    <div className="mx-auto max-w-xl rounded-card border border-brand-border bg-brand-pampas p-8 text-center shadow-soft">
                        <h2 className="font-heading text-2xl font-bold text-brand-ink">
                            Відгуки тимчасово недоступні
                        </h2>

                        <p className="mt-3 leading-7 text-brand-muted">
                            Не вдалося завантажити список. Спробуйте оновити за хвилину.
                        </p>

                        <Button
                            onClick={handleRetry}
                            className="mt-6 inline-flex items-center gap-x-2 rounded-button bg-brand-madison px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-madisonDark"
                        >
                            <RxReload />
                            Спробувати ще раз
                        </Button>
                    </div>
                )}

                {!isLoading && !hasError && testimonials.length === 0 && (
                    <p className="text-center leading-7 text-brand-muted">
                        Тут ще немає жодного відгуку.
                    </p>
                )}

                {testimonials.length > 0 && (
                    <>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    tone={TESTIMONIAL_TONES[index % TESTIMONIAL_TONES.length]}
                                />
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col items-center gap-4">
                            <p className="text-sm text-brand-gothic">
                                Показано {testimonials.length} з {total}
                            </p>

                            {hasMore && (
                                <Button
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoadingMore ? "Завантаження..." : "Показати ще"}
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
