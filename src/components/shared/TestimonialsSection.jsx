"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import { getPublishedTestimonials } from "../../services/testimonialsService";
import TestimonialCard from "./TestimonialCard";
import { TESTIMONIAL_TONES } from "../../constants/testimonials";

/**
 * Секція зі схваленими відгуками для головної та «Про мене».
 *
 * Показує лише кілька найсвіжіших: сторінка не має розтягуватись на екран
 * прокрутки, коли відгуків стане півсотні. Решта живе на /testimonials.
 */
export function TestimonialsSection({
                                        title,
                                        subtitle,
                                        background = "bg-white",
                                        take = 3,
                                    }) {
    const [testimonials, setTestimonials] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Прапорець проти оновлення стану вже прибраного компонента.
        let isActive = true;

        getPublishedTestimonials({ take })
            .then((page) => {
                if (!isActive) return;

                setTestimonials(page.items);
                setTotal(page.total);
            })
            .catch((error) => {
                if (!isActive) return;

                // Відгуки — прикраса, а не суть сторінки. Якщо не завантажились,
                // мовчки ховаємо секцію, а не лякаємо відвідувача помилкою.
                console.error("Failed to load testimonials:", error);
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [take]);

    // Порожня секція «Що кажуть клієнти» без жодного відгуку виглядає гірше,
    // ніж її відсутність, тому не малюємо нічого, поки нема що показати.
    if (isLoading || testimonials.length === 0) return null;

    const hasMore = total > testimonials.length;

    return (
        <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${background}`}>
            <div className="container">
                <div className="mb-10 max-w-3xl md:mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                        Відгуки
                    </p>

                    {/* На крок менший за заголовки інших секцій: відгуки —
                        доповнення до сторінки, а не її головна заява. */}
                    <h2 className="mb-5 font-heading text-3xl font-bold leading-tight text-brand-ink md:mb-6 md:text-5xl">
                        {title}
                    </h2>

                    <p className="max-w-2xl text-base leading-7 text-brand-muted md:text-md">
                        {subtitle}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            tone={TESTIMONIAL_TONES[index % TESTIMONIAL_TONES.length]}
                        />
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/testimonials"
                            className="inline-flex items-center gap-2 rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-madison shadow-soft transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                        >
                            Усі відгуки ({total})
                            <RxChevronRight className="size-4" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
