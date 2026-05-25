"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import { ClientRequestForm } from "./ClientRequestForm";

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

                    <ClientRequestForm />
                </div>
            </div>
        </section>
    );
}