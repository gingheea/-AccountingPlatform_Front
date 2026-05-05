"use client";

import { Button } from "@relume_io/relume-ui";
import { BiCheck } from "react-icons/bi";

export function ServicesPricing() {
  const featureClass = "flex items-start gap-3";
  const checkClass =
      "mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-brand-pampas text-brand-madison";

  return (
      <section id="pricing" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Ціни
            </p>

            <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Прозорі тарифи
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Оберіть план під свій формат роботи. Остаточна вартість залежить від
              кількості документів, звітності та потрібного рівня супроводу.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex h-full flex-col justify-between rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8">
              <div>
                <div className="rb-6 mb-8 text-center">
                  <p className="mb-4 inline-flex rounded-full bg-brand-pampas px-4 py-2 text-sm font-semibold text-brand-madison">
                    Для старту
                  </p>

                  <h6 className="font-heading text-xl font-bold text-brand-ink">
                    Для ФОП
                  </h6>

                  <div className="my-4 flex items-end justify-center gap-2">
                  <span className="font-heading text-6xl font-bold tracking-[-0.04em] text-brand-ink md:text-7xl">
                    1500
                  </span>
                    <span className="mb-3 text-base font-medium text-brand-muted">
                    грн
                  </span>
                  </div>

                  <p className="text-brand-muted">на місяць</p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className={featureClass}>
                    <div className={checkClass}>
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Облік доходів та витрат
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className={checkClass}>
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Розрахунок податків
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className={checkClass}>
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Підготовка базової звітності
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className={checkClass}>
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Одна консультація на місяць
                    </p>
                  </div>
                </div>
              </div>

              <Button
                  title="Обрати"
                  className="w-full rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
              >
                Обрати
              </Button>
            </div>

            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-white/15 bg-brand-madison p-6 text-white shadow-card md:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-brand-tan/25" />

              <div className="relative z-10">
                <div className="rb-6 mb-8 text-center">
                  <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-tan">
                    Рекомендовано
                  </p>

                  <h6 className="font-heading text-xl font-bold text-white">
                    Для малого бізнесу
                  </h6>

                  <div className="my-4 flex items-end justify-center gap-2">
                  <span className="font-heading text-6xl font-bold tracking-[-0.04em] text-white md:text-7xl">
                    3500
                  </span>
                    <span className="mb-3 text-base font-medium text-white/65">
                    грн
                  </span>
                  </div>

                  <p className="text-white/65">на місяць</p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Повна бухгалтерія та звітність
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Податкове планування
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Регулярна комунікація
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Підготовка до перевірок
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Клієнтський портал
                    </p>
                  </div>
                </div>
              </div>

              <Button
                  title="Обрати"
                  className="relative z-10 w-full rounded-button bg-white px-6 py-3 font-semibold text-brand-madison shadow-soft transition-colors hover:bg-brand-pampas"
              >
                Обрати
              </Button>
            </div>

            <div className="flex h-full flex-col justify-between rounded-card border border-brand-border bg-brand-pampas p-6 shadow-soft md:p-8">
              <div>
                <div className="rb-6 mb-8 text-center">
                  <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-madison">
                    Разово
                  </p>

                  <h6 className="font-heading text-xl font-bold text-brand-ink">
                    Консультації
                  </h6>

                  <div className="my-4 flex items-end justify-center gap-2">
                  <span className="font-heading text-6xl font-bold tracking-[-0.04em] text-brand-ink md:text-7xl">
                    500
                  </span>
                    <span className="mb-3 text-base font-medium text-brand-muted">
                    грн
                  </span>
                  </div>

                  <p className="text-brand-muted">за годину</p>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white text-brand-madison">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Індивідуальний розбір питання
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white text-brand-madison">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Аналіз поточної ситуації
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white text-brand-madison">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Рекомендації та наступні кроки
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white text-brand-madison">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Можливість перейти на супровід
                    </p>
                  </div>
                </div>
              </div>

              <Button
                  title="Обрати"
                  className="w-full rounded-button border border-brand-madison bg-white px-6 py-3 font-semibold text-brand-madison transition-colors hover:bg-brand-madison hover:text-white"
              >
                Обрати
              </Button>
            </div>
          </div>
        </div>
      </section>
  );
}