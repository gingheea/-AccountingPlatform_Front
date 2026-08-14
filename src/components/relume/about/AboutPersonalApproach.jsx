"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { SOCIAL_LINKS } from "../../../constants/site";

export function AboutPersonalApproach() {
  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Персональний підхід
            </p>

            <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Ви працюєте напряму зі спеціалістом
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Без зайвих менеджерів, пересилання між відділами й втрати контексту.
              Я особисто розумію вашу ситуацію, документи та задачі.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-card border border-brand-border bg-brand-madison p-8 text-white shadow-card">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,175,123,0.35),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-8 flex size-20 items-center justify-center rounded-2xl bg-white font-heading text-2xl font-bold text-brand-madison shadow-soft">
                    AP
                  </div>

                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-tan">
                    Незалежний бухгалтер
                  </p>

                  <h3 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                    Особисто веду процес і відповідаю за результат
                  </h3>

                  <p className="mt-5 max-w-lg leading-7 text-white/75">
                    Я займаюся обліком, звітністю, документами та податковими
                    питаннями для ФОП і малого бізнесу. Такий формат дозволяє
                    зберігати якість, конфіденційність і повний контекст роботи.
                  </p>
                </div>

                {/* Іконка зʼявляється лише коли акаунт заданий у constants/site.js */}
                <div className="mt-10 flex items-center gap-4">
                  {SOCIAL_LINKS.linkedin && (
                      <a
                          href={SOCIAL_LINKS.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white hover:text-brand-madison"
                      >
                        <BiLogoLinkedinSquare className="size-6" />
                      </a>
                  )}

                  {SOCIAL_LINKS.x && (
                      <a
                          href={SOCIAL_LINKS.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white hover:text-brand-madison"
                      >
                        <FaXTwitter className="size-5" />
                      </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-card border border-brand-border bg-brand-pampas p-6 shadow-soft">
                <div className="mb-4 flex size-11 items-center justify-center rounded-button bg-white font-heading text-sm font-bold text-brand-madison">
                  01
                </div>

                <h4 className="font-heading text-xl font-bold text-brand-ink">
                  Повний контекст
                </h4>

                <p className="mt-3 leading-7 text-brand-muted">
                  Я бачу всю картину: документи, звітність, дедлайни, податкові
                  питання та вашу бізнес-логіку.
                </p>
              </div>

              <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                <div className="mb-4 flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  02
                </div>

                <h4 className="font-heading text-xl font-bold text-brand-ink">
                  Пряма комунікація
                </h4>

                <p className="mt-3 leading-7 text-brand-muted">
                  Питання вирішуються без зайвих проміжних ланок — ви отримуєте
                  відповідь від людини, яка веде ваш облік.
                </p>
              </div>

              <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                <div className="mb-4 flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  03
                </div>

                <h4 className="font-heading text-xl font-bold text-brand-ink">
                  Конфіденційність
                </h4>

                <p className="mt-3 leading-7 text-brand-muted">
                  Фінансові документи, податкові питання та внутрішня інформація
                  бізнесу залишаються в контрольованому процесі.
                </p>
              </div>

              <div className="rounded-card border border-brand-border bg-brand-pampas p-6 shadow-soft">
                <div className="mb-4 flex size-11 items-center justify-center rounded-button bg-white font-heading text-sm font-bold text-brand-madison">
                  04
                </div>

                <h4 className="font-heading text-xl font-bold text-brand-ink">
                  Якість замість масштабу
                </h4>

                <p className="mt-3 leading-7 text-brand-muted">
                  Мета — не вести “всіх підряд”, а підтримувати зрозумілий,
                  якісний і стабільний формат роботи.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 w-full max-w-2xl rounded-card border border-brand-border bg-brand-pampas p-8 text-center shadow-soft md:mt-20 lg:mt-24">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
              Розвиток
            </p>

            <h4 className="mb-3 font-heading text-3xl font-bold leading-tight text-brand-ink md:mb-4 md:text-4xl">
              Постійно оновлюю знання
            </h4>

            <p className="mx-auto max-w-xl leading-7 text-brand-muted md:text-md">
              Податкові правила, інструменти й бізнес-процеси змінюються, тому я
              регулярно навчаюся, щоб давати клієнтам актуальні рішення.
            </p>

            <div className="mt-8 flex items-center justify-center gap-x-4 text-center">
              <Button
                  title="Мої курси"
                  variant="secondary"
                  className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
              >
                Мої курси
              </Button>
            </div>
          </div>
        </div>
      </section>
  );
}