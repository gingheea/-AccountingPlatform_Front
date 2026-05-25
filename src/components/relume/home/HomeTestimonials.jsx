"use client";

import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

export function HomeTestimonials() {
  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mb-12 max-w-3xl md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Відгуки
            </p>

            <h2 className="mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Що кажуть клієнти
            </h2>

            <p className="max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Підприємці та власники малого бізнесу, які довіряють мені облік,
              звітність і роботу з документами.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex w-full flex-col items-start justify-between rounded-card border border-brand-border bg-brand-pampas p-6 shadow-soft md:p-8">
              <div className="rb-5 mb-5 md:mb-6">
                <div className="mb-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-madison shadow-sm md:mb-10 lg:mb-12">
                  Online commerce
                </div>

                <blockquote className="font-heading text-2xl font-semibold leading-snug text-brand-ink md:text-3xl">
                  “Нарешті хтось, хто розуміє мій бізнес і не ускладнює облік.”
                </blockquote>

                <p className="mt-5 leading-7 text-brand-muted md:mt-6">
                  Документи, платежі та звітність стали зрозумілішими, а робочий
                  процес — набагато спокійнішим.
                </p>

                <div className="mt-6 flex w-full items-center gap-4 md:mt-8">
                  <div className="flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full bg-brand-madison font-heading font-bold text-white">
                    МП
                  </div>

                  <div>
                    <p className="font-semibold text-brand-ink">Марія Петренко</p>
                    <p className="text-sm text-brand-muted">
                      Власниця онлайн-магазину
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <Button
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                >
                  Переглянути історію
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-between rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8">
              <div className="rb-5 mb-5 md:mb-6">
                <div className="mb-8 inline-flex rounded-full bg-brand-pampas px-4 py-2 text-sm font-semibold text-brand-madison md:mb-10 lg:mb-12">
                  ФОП / консультації
                </div>

                <blockquote className="font-heading text-2xl font-semibold leading-snug text-brand-ink md:text-3xl">
                  “Економія часу та грошей. Саме те, що потрібно малому бізнесу.”
                </blockquote>

                <p className="mt-5 leading-7 text-brand-muted md:mt-6">
                  Я отримав зрозумілу систему роботи: що оплатити, що підготувати
                  і коли подати.
                </p>

                <div className="mt-6 flex w-full items-center gap-4 md:mt-8">
                  <div className="flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full bg-brand-tan font-heading font-bold text-brand-ink">
                    СК
                  </div>

                  <div>
                    <p className="font-semibold text-brand-ink">
                      Сергій Коваленко
                    </p>
                    <p className="text-sm text-brand-muted">ФОП, консультант</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <Button
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                >
                  Переглянути історію
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-between rounded-card border border-brand-border bg-brand-madison p-6 shadow-card md:p-8">
              <div className="rb-5 mb-5 md:mb-6">
                <div className="mb-8 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-tan md:mb-10 lg:mb-12">
                  Малий бізнес
                </div>

                <blockquote className="font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
                  “Професійно, надійно, без зайвих слів. Саме такого бухгалтера я
                  шукав.”
                </blockquote>

                <p className="mt-5 leading-7 text-white/75 md:mt-6">
                  Замість хаосу в документах ми отримали регулярний контроль,
                  зрозумілі дедлайни та нормальну комунікацію.
                </p>

                <div className="mt-6 flex w-full items-center gap-4 md:mt-8">
                  <div className="flex size-12 min-h-12 min-w-12 items-center justify-center rounded-full bg-white font-heading font-bold text-brand-madison">
                    ОШ
                  </div>

                  <div>
                    <p className="font-semibold text-white">Олег Шевченко</p>
                    <p className="text-sm text-white/65">
                      Директор малого бізнесу
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <Button
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="font-semibold text-white transition-colors hover:text-brand-tan"
                >
                  Переглянути історію
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}