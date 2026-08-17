"use client";

import { Link } from "react-router-dom";
import { RxArrowRight, RxCheck } from "react-icons/rx";

export function HomeHero() {
  return (
      <section className="relative overflow-hidden bg-brand-pampas scroll-mt-28">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-bl-[6rem] bg-brand-madison/5" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-tr-[6rem] bg-brand-tan/20" />

        <div className="container relative z-10 grid grid-cols-1 items-center gap-y-14 px-[5%] py-16 md:py-24 lg:grid-cols-2 lg:gap-x-16 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-madison shadow-sm">
              Бухгалтерський супровід для ФОП та малого бізнесу
            </p>

            <h1 className="mb-5 font-heading text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink md:mb-6 md:text-7xl lg:text-8xl">
              Облік без хаосу, дедлайнів в останній момент і зайвого стресу
            </h1>

            <p className="max-w-xl text-base leading-7 text-brand-muted md:text-md">
              Допомагаю підприємцям вести облік, готувати звітність, працювати з
              документами та тримати податки під контролем — зрозуміло, спокійно
              і без зайвої бюрократії.
            </p>

            {/* Раніше тут було поле пошти, яке нікуди не вело. Заявку приймає
                повноцінна форма нижче — тому шапка просто веде до неї. */}
            <div className="mt-8 max-w-xl md:mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                    to="/#contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-brand-madison px-7 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Залишити заявку
                  <RxArrowRight className="size-5" />
                </Link>

                <Link
                    to="/services"
                    className="inline-flex min-h-12 items-center justify-center rounded-button border border-brand-border bg-white px-7 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-white"
                >
                  Переглянути послуги
                </Link>
              </div>

              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-muted">
                {[
                  "Відповідь того ж дня",
                  "Без передоплати за консультацію",
                  "Зрозумілі умови",
                ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <RxCheck className="size-4 text-brand-madison" />
                      {item}
                    </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
                <p className="font-heading text-2xl font-bold text-brand-madison">
                  ФОП
                </p>
                <p className="mt-1 text-sm leading-5 text-brand-muted">
                  регулярний облік
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
                <p className="font-heading text-2xl font-bold text-brand-madison">
                  SMB
                </p>
                <p className="mt-1 text-sm leading-5 text-brand-muted">
                  малий бізнес
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
                <p className="font-heading text-2xl font-bold text-brand-madison">
                  Portal
                </p>
                <p className="mt-1 text-sm leading-5 text-brand-muted">
                  документи онлайн
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <div className="absolute inset-0 rounded-[2rem] bg-brand-madison shadow-card" />

            <div className="absolute inset-4 rounded-[1.5rem] border border-white/15 bg-white/10" />

            <div className="absolute left-0 top-8 w-[88%] rounded-card border border-brand-border bg-white p-6 shadow-card md:left-8 md:top-14 md:w-[78%]">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand-gothic">
                    Client portal
                  </p>

                  <h3 className="mt-1 font-heading text-2xl font-bold text-brand-ink">
                    Панель документів
                  </h3>
                </div>

                <span className="rounded-full bg-brand-pampas px-3 py-1 text-xs font-semibold text-brand-madison">
                Secure
              </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">
                      Податкова звітність
                    </p>
                    <p className="text-xs text-brand-muted">Оновлено сьогодні</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-madison">
                  Готово
                </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">
                      Рахунки та акти
                    </p>
                    <p className="text-xs text-brand-muted">12 документів</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-madison">
                  Перевірено
                </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">
                      Консультація
                    </p>
                    <p className="text-xs text-brand-muted">Наступний крок</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-tan">
                  Запланувати
                </span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 right-0 w-[76%] rounded-card border border-white/15 bg-white p-5 shadow-card md:right-8 md:w-[58%]">
              <p className="text-sm font-semibold text-brand-gothic">
                Monthly overview
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-brand-muted">
                    Документи
                  </span>
                    <span className="font-semibold text-brand-madison">82%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-brand-soft">
                    <div className="h-full w-[82%] rounded-full bg-brand-madison" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-brand-muted">
                    Звітність
                  </span>
                    <span className="font-semibold text-brand-madison">100%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-brand-soft">
                    <div className="h-full w-full rounded-full bg-brand-tan" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-8 top-0 hidden rounded-full bg-brand-tan px-5 py-2 text-sm font-semibold text-brand-ink shadow-soft md:block">
              Податки під контролем
            </div>
          </div>
        </div>
      </section>
  );
}