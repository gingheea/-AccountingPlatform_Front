"use client";

import { useEffect, useState } from "react";
import { getPublishedTestimonials } from "../../services/testimonialsService";
import { authorInitials } from "../../constants/testimonials";

/**
 * Три оформлення карток по колу — світла, біла й темна. Раніше кожна була
 * прописана в розмітці окремо; тепер відгуків може бути будь-скільки,
 * тому вигляд обираємо за позицією.
 */
const TONES = [
    {
        card: "border-brand-border bg-brand-pampas",
        badge: "bg-white text-brand-madison",
        quote: "text-brand-ink",
        avatar: "bg-brand-madison text-white",
        name: "text-brand-ink",
        role: "text-brand-muted",
    },
    {
        card: "border-brand-border bg-white",
        badge: "bg-brand-pampas text-brand-madison",
        quote: "text-brand-ink",
        avatar: "bg-brand-tan text-brand-ink",
        name: "text-brand-ink",
        role: "text-brand-muted",
    },
    {
        card: "border-brand-border bg-brand-madison shadow-card",
        badge: "bg-white/10 text-brand-tan",
        quote: "text-white",
        avatar: "bg-white text-brand-madison",
        name: "text-white",
        role: "text-white/65",
    },
];

const TestimonialCard = ({ testimonial, tone }) => (
    <div
        className={`flex w-full flex-col items-start justify-between rounded-card border p-6 shadow-soft md:p-8 ${tone.card}`}
    >
        <div className="rb-5 mb-5 md:mb-6">
            {testimonial.authorRole && (
                <div
                    className={`mb-8 inline-flex rounded-full px-4 py-2 text-sm font-semibold md:mb-10 lg:mb-12 ${tone.badge}`}
                >
                    {testimonial.authorRole}
                </div>
            )}

            <blockquote
                className={`font-heading text-2xl font-semibold leading-snug md:text-3xl ${tone.quote}`}
            >
                “{testimonial.content}”
            </blockquote>

            <div className="mt-6 flex w-full items-center gap-4 md:mt-8">
                <div
                    className={`flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full font-heading font-bold ${tone.avatar}`}
                >
                    {authorInitials(testimonial.authorName)}
                </div>

                <div>
                    <p className={`font-semibold ${tone.name}`}>
                        {testimonial.authorName}
                    </p>

                    {testimonial.authorRole && (
                        <p className={`text-sm ${tone.role}`}>{testimonial.authorRole}</p>
                    )}
                </div>
            </div>
        </div>
    </div>
);

/**
 * Секція зі схваленими відгуками. Головна й «Про мене» відрізняються лише
 * заголовками та фоном, тому решта живе тут одним місцем.
 */
export function TestimonialsSection({
                                        title,
                                        subtitle,
                                        background = "bg-white",
                                        take = 6,
                                    }) {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Прапорець проти оновлення стану вже прибраного компонента.
        let isActive = true;

        getPublishedTestimonials(take)
            .then((data) => {
                if (isActive) setTestimonials(Array.isArray(data) ? data : []);
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

    return (
        <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${background}`}>
            <div className="container">
                <div className="mb-12 max-w-3xl md:mb-18 lg:mb-20">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                        Відгуки
                    </p>

                    <h2 className="mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
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
                            tone={TONES[index % TONES.length]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
