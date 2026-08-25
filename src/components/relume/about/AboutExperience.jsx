"use client";

import { SOCIAL_LINKS } from "../../../constants/site";
import { Link } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";

export function AboutExperience() {
  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                Досвід
              </p>

              <h1 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                Мій підхід сформований практикою, а не шаблонними рішеннями
              </h1>

              <p className="mb-8 max-w-xl text-base leading-7 text-brand-muted md:text-md">
                Я працюю з підприємцями та малим бізнесом, які хочуть бачити
                порядок у документах, розуміти свої податкові зобовʼязання й не
                втрачати час на хаотичний облік.
              </p>

              <div className="grid grid-cols-1 gap-5 py-2 sm:grid-cols-2">
                <div className="rounded-card border border-brand-border bg-brand-pampas p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-button bg-white font-heading text-lg font-bold text-brand-madison shadow-sm">
                    01
                  </div>

                  <h6 className="mb-3 font-heading text-xl font-bold leading-[1.4] text-brand-ink">
                    Освіта
                  </h6>

                  <p className="leading-7 text-brand-muted">
                    Профільна база в бухгалтерському обліку, податках і роботі з
                    фінансовими документами.
                  </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-button bg-brand-pampas font-heading text-lg font-bold text-brand-madison">
                    02
                  </div>

                  <h6 className="mb-3 font-heading text-xl font-bold leading-[1.4] text-brand-ink">
                    Спеціалізація
                  </h6>

                  <p className="leading-7 text-brand-muted">
                    Фокус на ФОП, самозайнятих спеціалістах і малому бізнесі, де
                    важливі точність, строки та зрозуміла комунікація.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                    to="/services"
                    className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Переглянути послуги
                </Link>

                {SOCIAL_LINKS.linkedin && (
                    <a
                        href={SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                    >
                      LinkedIn
                      <RxChevronRight className="size-5" />
                    </a>
                )}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-card border border-brand-border bg-brand-madison p-8 shadow-card md:min-h-[560px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,175,123,0.35),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-tan">
                  Professional background
                </span>

                  <h3 className="max-w-lg font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
                    Облік має бути зрозумілим для власника бізнесу
                  </h3>

                  <p className="mt-5 max-w-lg leading-7 text-white/75">
                    Моє завдання — не просто підготувати документи, а допомогти
                    вам бачити картину: що подати, коли оплатити, які ризики
                    врахувати і як тримати все під контролем.
                  </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-sm text-white/65">Фокус</p>
                    <p className="mt-1 font-semibold text-white">ФОП / SMB</p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-sm text-white/65">Підхід</p>
                    <p className="mt-1 font-semibold text-white">Системно</p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="text-sm text-white/65">Результат</p>
                    <p className="mt-1 font-semibold text-white">Порядок</p>
                  </div>
                </div>

                <div className="mt-10 rounded-card border border-white/15 bg-white p-5 shadow-card">
                  <p className="text-sm font-semibold text-brand-gothic">
                    Щомісячний процес
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                    <span className="text-sm font-medium text-brand-muted">
                      Документи
                    </span>
                      <span className="text-sm font-semibold text-brand-madison">
                      Перевірено
                    </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                    <span className="text-sm font-medium text-brand-muted">
                      Звітність
                    </span>
                      <span className="text-sm font-semibold text-brand-madison">
                      За планом
                    </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                    <span className="text-sm font-medium text-brand-muted">
                      Податки
                    </span>
                      <span className="text-sm font-semibold text-brand-tan">
                      Контроль
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}