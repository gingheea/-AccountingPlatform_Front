"use client";

import { Button } from "@relume_io/relume-ui";

export function ServicesCta() {
  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-card border border-brand-border bg-brand-madison p-8 shadow-card md:p-12 lg:p-16">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-bl-[5rem] bg-brand-tan/25" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-tr-[5rem] bg-white/10" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-tan">
                Наступний крок
              </p>

              <div className="max-w-3xl">
                <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-white md:mb-6 md:text-6xl lg:text-7xl">
                  Почніть з короткої консультації
                </h2>

                <p className="mx-auto max-w-2xl text-base leading-7 text-white/75 md:text-md">
                  Обговоримо вашу ситуацію, визначимо потрібний формат супроводу
                  та підготуємо зрозумілий розрахунок вартості послуг.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                    title="Консультація"
                    className="rounded-button bg-white px-6 py-3 font-semibold text-brand-madison shadow-soft transition-colors hover:bg-brand-pampas"
                >
                  Консультація
                </Button>

                <Button
                    title="Розрахунок"
                    variant="secondary"
                    className="rounded-button border border-white/25 bg-white/10 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Розрахунок
                </Button>
              </div>

              <div className="mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm text-white/65">01</p>
                  <p className="mt-1 font-semibold text-white">
                    Розбираємо задачу
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm text-white/65">02</p>
                  <p className="mt-1 font-semibold text-white">
                    Обираємо пакет
                  </p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm text-white/65">03</p>
                  <p className="mt-1 font-semibold text-white">
                    Узгоджуємо старт
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}