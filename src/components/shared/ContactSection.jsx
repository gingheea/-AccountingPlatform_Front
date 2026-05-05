"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

export function ContactSection({
                                   eyebrow = "Контакти",
                                   title = "Звʼяжіться зі мною",
                                   description = "Напишіть, зателефонуйте або залиште запит — я підкажу найкращий формат бухгалтерського супроводу.",
                                   email = "hello@example.com",
                                   phone = "+38 (095) 123-45-67",
                                   phoneHref = "+380951234567",
                                   thirdCardTitle = "Месенджери",
                                   thirdCardDescription = "Пишіть у Telegram або WhatsApp для швидкої відповіді.",
                                   thirdCardButtonText = "Написати",
                                   thirdCardHref = "https://t.me/your_username",
                                   accentLabel = "Перша консультація",
                                   accentTitle = "Обговоримо ваш облік і підберемо правильний формат роботи",
                                   accentDescription = "Коротко розберемо вашу ситуацію: ФОП, малий бізнес, звітність, документи, податки або потребу в регулярному супроводі.",
                                   statOneLabel = "Формат",
                                   statOneValue = "Online / phone",
                                   statTwoLabel = "Відповідь",
                                   statTwoValue = "У робочий день",
                                   statThreeLabel = "Мова",
                                   statThreeValue = "UA / IT / EN",
                                   actionText = "Записатися на консультацію",
                                   actionHref = "mailto:hello@example.com?subject=Запит%20на%20консультацію",
                                   sectionId = "contact",
                               }) {
    return (
        <section
            id={sectionId}
            className="scroll-mt-28 bg-white px-[5%] py-16 md:py-24 lg:py-28"
        >
            <div className="container">
                <div className="rb-12 mb-12 max-w-3xl md:mb-18 lg:mb-20">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                        {eyebrow}
                    </p>

                    <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                        {title}
                    </h2>

                    <p className="max-w-2xl text-base leading-7 text-brand-muted md:text-md">
                        {description}
                    </p>
                </div>

                <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[0.8fr_1.2fr] md:gap-x-16 md:gap-y-16 lg:gap-x-20">
                    <div className="grid auto-cols-fr grid-cols-1 gap-5">
                        <div className="rounded-card border border-brand-border bg-white p-6 transition-shadow hover:shadow-soft">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-button bg-brand-pampas text-brand-madison shadow-sm">
                                <BiEnvelope className="size-6" />
                            </div>

                            <h3 className="mb-2 font-heading text-xl font-bold leading-[1.4] text-brand-ink">
                                Електронна пошта
                            </h3>

                            <p className="mb-3 leading-6 text-brand-muted">
                                Напишіть мені
                            </p>

                            <a
                                className="font-semibold text-brand-madison underline-offset-4 transition-colors hover:text-brand-madisonDark hover:underline"
                                href={`mailto:${email}`}
                            >
                                {email}
                            </a>
                        </div>

                        <div className="rounded-card border border-brand-border bg-white p-6 transition-shadow hover:shadow-soft">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-button bg-brand-pampas text-brand-madison shadow-sm">
                                <BiPhone className="size-6" />
                            </div>

                            <h3 className="mb-2 font-heading text-xl font-bold leading-[1.4] text-brand-ink">
                                Телефон
                            </h3>

                            <p className="mb-3 leading-6 text-brand-muted">
                                Зателефонуйте напряму
                            </p>

                            <a
                                className="font-semibold text-brand-madison underline-offset-4 transition-colors hover:text-brand-madisonDark hover:underline"
                                href={`tel:${phoneHref}`}
                            >
                                {phone}
                            </a>
                        </div>

                        <div className="rounded-card border border-brand-border bg-white p-6 transition-shadow hover:shadow-soft">
                            <div className="mb-4 flex size-12 items-center justify-center rounded-button bg-brand-pampas text-brand-madison shadow-sm">
                                <BiMap className="size-6" />
                            </div>

                            <h3 className="mb-2 font-heading text-xl font-bold leading-[1.4] text-brand-ink">
                                {thirdCardTitle}
                            </h3>

                            <p className="mb-4 leading-6 text-brand-muted">
                                {thirdCardDescription}
                            </p>

                            <a
                                href={thirdCardHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                            >
                                {thirdCardButtonText}
                                <RxChevronRight />
                            </a>
                        </div>
                    </div>

                    <a
                        href={actionHref}
                        className="group relative overflow-hidden rounded-card border border-brand-border bg-brand-madison p-8 shadow-card md:min-h-[516px]"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,175,123,0.35),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />

                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <div>
                <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-tan">
                  {accentLabel}
                </span>

                                <h3 className="mb-5 max-w-xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                                    {accentTitle}
                                </h3>

                                <p className="max-w-lg leading-7 text-white/75">
                                    {accentDescription}
                                </p>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                                    <p className="text-sm text-white/65">{statOneLabel}</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {statOneValue}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                                    <p className="text-sm text-white/65">{statTwoLabel}</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {statTwoValue}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                                    <p className="text-sm text-white/65">{statThreeLabel}</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {statThreeValue}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10">
                <span className="inline-flex items-center gap-2 font-semibold text-white transition-transform group-hover:translate-x-1">
                  {actionText}
                    <RxChevronRight />
                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}