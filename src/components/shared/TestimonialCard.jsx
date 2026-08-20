"use client";

import { useState } from "react";
import { authorInitials } from "../../constants/testimonials";

/**
 * Поріг, після якого відгук згортається. Рахуємо по символах, а не по
 * висоті в пікселях: вимірювати висоту довелось би вже після малювання,
 * і картка встигла б смикнутись у користувача на очах.
 *
 * 260 — приблизно шість рядків у колонці такої ширини. Точність тут
 * не потрібна: помилимось на рядок — нічого не станеться.
 */
const CLAMP_THRESHOLD = 260;

export default function TestimonialCard({ testimonial, tone, allowExpand = true }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const isLong = testimonial.content.length > CLAMP_THRESHOLD;
    const isClamped = isLong && allowExpand && !isExpanded;

    return (
        // h-full — щоб картка розтяглась на всю висоту комірки сітки. Без цього
        // приліпити підпис до низу неможливо: картка закінчується там, де
        // закінчився текст, а не там, де закінчився рядок.
        <div
            className={`flex h-full w-full flex-col rounded-card border p-6 shadow-soft ${tone.card}`}
        >
            {/*
              text-md → text-lg, а не text-lg → text-xl: у пресеті Relume
              text-lg і text-xl обидва дають 20px, тож такий «крок» нічого
              б не змінював. Пресет підміняє власну шкалу поверх стандартної
              тайлвіндівської — так само, як він робить з max-w-*.
            */}
            <blockquote
                className={`font-heading text-md font-semibold leading-relaxed md:text-lg ${tone.quote} ${
                    isClamped ? "line-clamp-6" : ""
                }`}
            >
                “{testimonial.content}”
            </blockquote>

            {isLong && allowExpand && (
                <button
                    type="button"
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                    className={`mt-3 w-fit text-sm font-semibold underline underline-offset-4 transition-colors ${tone.more}`}
                >
                    {isExpanded ? "Згорнути" : "Читати повністю"}
                </button>
            )}

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
                      Рядок ролі малюємо завжди, навіть коли її не вказали: інакше
                      підпис стає на один рядок нижчим, і на тлі сусідів імʼя
                      «стрибає» вниз на 11 пікселів. Запасне слово чесне —
                      автор відгуку справді клієнт.
                    */}
                    <p className={`truncate text-sm ${tone.role}`}>
                        {testimonial.authorRole || "Клієнт"}
                    </p>
                </div>
            </div>
        </div>
    );
}
