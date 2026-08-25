"use client";

import { BiCheck, BiX } from "react-icons/bi";

export function ServicesPackagesComparison() {
  const priceRowClass =
      "flex justify-between gap-4 border-b border-brand-border py-5 first:border-t";

  const featureClass = "flex items-start gap-3";
  const checkIconClass =
      "mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-brand-pampas text-brand-madison";
  const xIconClass =
      "mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-brand-soft text-brand-gothic";

  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Пакети послуг
            </p>

            <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Оберіть формат бухгалтерського супроводу
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Виберіть базовий супровід для регулярних задач або повний пакет для
              системного ведення обліку, документів і звітності.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex h-full flex-col justify-between rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8">
              <div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-button bg-brand-pampas font-heading text-lg font-bold text-brand-madison">
                  01
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-gothic">
                    Для старту
                  </p>

                  <h3 className="mb-3 font-heading text-3xl font-bold leading-tight text-brand-ink md:text-4xl">
                    Базовий супровід
                  </h3>

                  <p className="leading-7 text-brand-muted">
                    Для ФОП, самозайнятих спеціалістів і малого бізнесу, яким
                    потрібен порядок у документах, платежах і базовій звітності.
                  </p>
                </div>

                <div className="grid grid-cols-1">
                  <div className={priceRowClass}>
                    <p className="text-brand-muted">Облік ФОП</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-brand-ink">
                      Від 1500 грн
                    </h6>
                  </div>

                  <div className={priceRowClass}>
                    <p className="text-brand-muted">Податкові консультації</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-brand-ink">
                      Індивідуально
                    </h6>
                  </div>

                  <div className={priceRowClass}>
                    <p className="text-brand-muted">Звітність</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-brand-ink">
                      За планом
                    </h6>
                  </div>

                  <div className={priceRowClass}>
                    <p className="text-brand-muted">Онлайн-консультація</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-brand-ink">
                      500 грн/год
                    </h6>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-y-4">
                  <div className={featureClass}>
                    <div className={checkIconClass}>
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Базовий контроль документів
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className={checkIconClass}>
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Підготовка регулярної звітності
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className={xIconClass}>
                      <BiX className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Інтеграція з Telegram та WhatsApp
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className={xIconClass}>
                      <BiX className="size-5" />
                    </div>
                    <p className="leading-6 text-brand-muted">
                      Онлайн-платежі та розрахунки
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-white/15 bg-brand-madison p-6 text-white shadow-card md:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-brand-tan/20" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex size-12 items-center justify-center rounded-button bg-white/10 font-heading text-lg font-bold text-brand-tan">
                    02
                  </div>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-tan">
                  Рекомендовано
                </span>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-tan">
                    Для регулярної роботи
                  </p>

                  <h3 className="mb-3 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                    Повний супровід
                  </h3>

                  <p className="leading-7 text-white/75">
                    Для бізнесу, якому потрібен не разовий контроль, а стабільна
                    система: документи, звітність, консультації, портал і
                    регулярна підтримка.
                  </p>
                </div>

                <div className="grid grid-cols-1">
                  <div className="flex justify-between gap-4 border-b border-white/15 py-5 first:border-t">
                    <p className="text-white/75">Облік ФОП та малого бізнесу</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-white">
                      Від 3000 грн
                    </h6>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-white/15 py-5 first:border-t">
                    <p className="text-white/75">Податкове планування</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-white">
                      Включено
                    </h6>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-white/15 py-5 first:border-t">
                    <p className="text-white/75">Звітність та подання</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-white">
                      Включено
                    </h6>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-white/15 py-5 first:border-t">
                    <p className="text-white/75">Консультації онлайн</p>
                    <h6 className="font-heading text-lg font-bold leading-[1.4] text-white">
                      Пріоритетно
                    </h6>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-y-4">
                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Портал для клієнтів
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Безпечний обмін документами
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Інтеграція з месенджерами
                    </p>
                  </div>

                  <div className={featureClass}>
                    <div className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan">
                      <BiCheck className="size-5" />
                    </div>
                    <p className="leading-6 text-white/75">
                      Онлайн-платежі та розрахунки
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}