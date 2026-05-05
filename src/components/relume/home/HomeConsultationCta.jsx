"use client";

import React from "react";

export function HomeConsultationCta() {
  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="overflow-hidden rounded-card border border-brand-border bg-brand-madison shadow-card">
            <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
              <div className="max-w-2xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-tan">
                  Консультація
                </p>

                <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-white md:mb-6 md:text-6xl lg:text-7xl">
                  Готові привести облік в порядок?
                </h2>

                <p className="max-w-xl text-base leading-7 text-white/75 md:text-md">
                  Запишіться на консультацію, щоб зрозуміти, який формат
                  бухгалтерського супроводу підійде саме вашому бізнесу.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                      href="/#quick-consultation"
                      className="inline-flex rounded-button bg-white px-6 py-3 font-semibold text-brand-madison shadow-soft transition-colors hover:bg-brand-pampas"
                  >
                    Записатися
                  </a>

                  <a
                      href="/services"
                      className="inline-flex rounded-button border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Дізнатися
                  </a>
                </div>
              </div>

              <div className="relative min-h-[320px]">
                <div className="absolute inset-0 rounded-[2rem] bg-white/10" />

                <div className="absolute left-0 top-8 w-[78%] rounded-card border border-white/15 bg-white p-6 shadow-card">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brand-gothic">
                        Статус обліку
                      </p>
                      <h3 className="mt-1 font-heading text-2xl font-bold text-brand-ink">
                        Все під контролем
                      </h3>
                    </div>

                    <span className="rounded-full bg-brand-pampas px-3 py-1 text-xs font-semibold text-brand-madison">
                    Active
                  </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                    <span className="text-sm font-medium text-brand-muted">
                      Звітність
                    </span>
                      <span className="text-sm font-semibold text-brand-madison">
                      Готово
                    </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                    <span className="text-sm font-medium text-brand-muted">
                      Документи
                    </span>
                      <span className="text-sm font-semibold text-brand-madison">
                      12 файлів
                    </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-brand-pampas px-4 py-3">
                    <span className="text-sm font-medium text-brand-muted">
                      Податки
                    </span>
                      <span className="text-sm font-semibold text-brand-madison">
                      Перевірено
                    </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-0 w-[62%] rounded-card border border-white/15 bg-brand-pampas p-5 shadow-card">
                  <p className="text-sm font-semibold text-brand-madison">
                    Наступний крок
                  </p>

                  <h4 className="mt-2 font-heading text-xl font-bold text-brand-ink">
                    Обрати пакет супроводу
                  </h4>

                  <p className="mt-3 text-sm leading-6 text-brand-muted">
                    Після консультації ви отримаєте зрозумілий план роботи.
                  </p>
                </div>

                <div className="absolute right-8 top-0 hidden rounded-full bg-brand-tan px-4 py-2 text-sm font-semibold text-brand-ink shadow-soft md:block">
                  Без хаосу в документах
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}