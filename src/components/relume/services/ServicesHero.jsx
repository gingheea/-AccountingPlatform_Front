"use client";

import { Link } from "react-router-dom";

export function ServicesHero() {
  return (
      <section className="relative overflow-hidden bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-bl-[6rem] bg-brand-madison/5" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-tr-[6rem] bg-brand-tan/20" />

        <div className="container relative z-10 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
            Послуги
          </p>

          <h1 className="mb-5 font-heading text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink md:mb-6 md:text-7xl lg:text-8xl">
            Бухгалтерія без ускладнень
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
            Прозорий бухгалтерський супровід для ФОП, самозайнятих спеціалістів і
            малого бізнесу: документи, податки, звітність і консультації в одному
            зрозумілому процесі.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
                to="/#contact"
                title="Консультація"
                className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
            >
              Консультація
            </Link>

            <Link
                to="/portal"
                className="rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-white"
            >
              Кабінет клієнта
            </Link>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
              <p className="font-heading text-2xl font-bold text-brand-madison">
                ФОП
              </p>
              <p className="mt-1 text-sm leading-5 text-brand-muted">
                облік і звітність
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
                Online
              </p>
              <p className="mt-1 text-sm leading-5 text-brand-muted">
                документи онлайн
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}