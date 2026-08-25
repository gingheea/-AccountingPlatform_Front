"use client";

import { Link } from "react-router-dom";
import { Fragment } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

export function HomeServicePackages() {
  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Пакети послуг
            </p>

            <h1 className="mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Облік для тих, хто цінує час
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Незалежний бухгалтер для ФОП, самозайнятих спеціалістів та малого
              бізнесу. Прозорі умови, зрозумілі пакети та підтримка без зайвої
              бюрократії.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-card">
              <div className="grid grid-cols-3 border-b border-brand-border md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                <Fragment>
                  <div className="hidden h-full flex-col items-start justify-end bg-white px-5 py-5 md:flex lg:p-6">
                    <h2 className="font-heading text-lg font-bold leading-[1.4] text-brand-ink md:text-xl">
                      Порівняння послуг
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      Оберіть формат супроводу під ваш бізнес.
                    </p>
                  </div>

                  <div className="flex h-full flex-col justify-between bg-brand-madison px-3 py-5 text-white sm:px-4 sm:py-6 lg:p-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                      Рекомендовано
                    </span>
                      <h3 className="font-heading text-base font-bold md:text-xl">
                        Повний супровід
                      </h3>
                      <p className="hidden text-sm leading-5 text-white/75 md:block">
                        Для стабільної роботи без зайвого контролю з вашого боку.
                      </p>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between bg-white px-3 py-5 sm:px-4 sm:py-6 lg:p-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                    <span className="rounded-full bg-brand-pampas px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-madison">
                      Базовий
                    </span>
                      <h3 className="font-heading text-base font-bold text-brand-ink md:text-xl">
                        Підтримка
                      </h3>
                      <p className="hidden text-sm leading-5 text-brand-muted md:block">
                        Для простих задач і регулярних консультацій.
                      </p>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between bg-white px-3 py-5 sm:px-4 sm:py-6 lg:p-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                    <span className="rounded-full bg-brand-pampas px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gothic">
                      Разово
                    </span>
                      <h3 className="font-heading text-base font-bold text-brand-ink md:text-xl">
                        Консультація
                      </h3>
                      <p className="hidden text-sm leading-5 text-brand-muted md:block">
                        Для окремих питань без щомісячного супроводу.
                      </p>
                    </div>
                  </div>
                </Fragment>
              </div>

              <div>
                <div className="grid grid-cols-3 border-b border-brand-border md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <p className="col-span-3 row-span-1 border-b border-brand-border px-5 py-4 font-medium text-brand-ink md:col-span-1 md:border-none md:pr-6">
                    Облік для ФОП
                  </p>

                  <div className="flex items-center justify-center bg-brand-madison px-4 py-4 text-center font-semibold text-white md:px-6">
                    <span>Повна підтримка</span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-ink md:px-6">
                    <span>Базова підтримка</span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-ink md:px-6">
                    <span>Консультація</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b border-brand-border md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <p className="col-span-3 row-span-1 border-b border-brand-border px-5 py-4 font-medium text-brand-ink md:col-span-1 md:border-none md:pr-6">
                    Облік малого бізнесу
                  </p>

                  <div className="flex items-center justify-center bg-brand-madison px-4 py-4 text-center font-semibold text-white md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-madison md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-pampas">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-madison md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-pampas">
                    <BiCheck className="size-6" />
                  </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b border-brand-border md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <p className="col-span-3 row-span-1 border-b border-brand-border px-5 py-4 font-medium text-brand-ink md:col-span-1 md:border-none md:pr-6">
                    Податкове консультування
                  </p>

                  <div className="flex items-center justify-center bg-brand-madison px-4 py-4 text-center font-semibold text-white md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-madison md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-pampas">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-madison md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-pampas">
                    <BiCheck className="size-6" />
                  </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 border-b border-brand-border md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <p className="col-span-3 row-span-1 border-b border-brand-border px-5 py-4 font-medium text-brand-ink md:col-span-1 md:border-none md:pr-6">
                    Ведення звітності
                  </p>

                  <div className="flex items-center justify-center bg-brand-madison px-4 py-4 text-center font-semibold text-white md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-madison md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-pampas">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-gothic md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-soft">
                    <BiX className="size-6" />
                  </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <p className="col-span-3 row-span-1 border-b border-brand-border px-5 py-4 font-medium text-brand-ink md:col-span-1 md:border-none md:pr-6">
                    Портал для документів
                  </p>

                  <div className="flex items-center justify-center bg-brand-madison px-4 py-4 text-center font-semibold text-white md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                    <BiCheck className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-gothic md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-soft">
                    <BiX className="size-6" />
                  </span>
                  </div>

                  <div className="flex items-center justify-center px-4 py-4 text-center font-semibold text-brand-gothic md:px-6">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-soft">
                    <BiX className="size-6" />
                  </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:mt-18 lg:mt-20">
              <Link
                  to="/#contact"
                  className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
              >
                Обрати пакет
              </Link>

              <Link
                  to="/services"
                  className="inline-flex items-center gap-1 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
              >
                Дізнатися більше
                <RxChevronRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
}