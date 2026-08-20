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
    // h-full — щоб картка розтяглась на всю висоту комірки сітки. Без цього
    // приліпити підпис до низу неможливо: картка закінчується там, де
    // закінчився текст, а не там, де закінчився рядок.
    <div
        className={`flex h-full w-full flex-col rounded-card border p-6 shadow-soft ${tone.card}`}
    >
        <blockquote
            className={`font-heading text-lg font-semibold leading-relaxed md:text-xl ${tone.quote}`}
        >
            “{testimonial.content}”
        </blockquote>

        {/*
          mt-auto з'їдає весь вільний простір над підписом і штовхає його вниз.
          Саме тому імена в одному рядку тепер стоять на одній лінії незалежно
          від того, чий відгук довший.
        */}
        <div className="mt-auto flex w-full items-center gap-3 pt-6">
            <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold ${tone.avatar}`}
            >
                {authorInitials(testimonial.authorName)}
            </div>

            <div className="min-w-0">
                <p className={`truncate font-semibold ${tone.name}`}>
                    {testimonial.authorName}
                </p>

                {/*
                  Рід занять показуємо лише тут. Раніше він дублювався ще й
                  значком угорі картки — і в кого ролі не було, у того текст
                  починався вище за сусідів.
                */}
                {testimonial.authorRole && (
                    <p className={`truncate text-sm ${tone.role}`}>
                        {testimonial.authorRole}
                    </p>
                )}
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
