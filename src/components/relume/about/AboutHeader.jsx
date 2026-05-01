"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function AboutHeader() {
  return (
      <section className="relative overflow-hidden bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-bl-[6rem] bg-brand-madison/5" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-tr-[6rem] bg-brand-tan/20" />

        <div className="container relative z-10 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
            Бухгалтер
          </p>

          <h1 className="mb-5 font-heading text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink md:mb-6 md:text-7xl lg:text-8xl">
            Я допомагаю підприємцям вести облік спокійно й без хаосу
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
            Незалежний бухгалтер для ФОП, самозайнятих спеціалістів і малого
            бізнесу. Мій підхід — зрозумілі процеси, точність у документах,
            контроль строків і персональна підтримка.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
                title="Консультація"
                className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
            >
              Консультація
            </Button>

            <Button
                title="Дізнатися"
                variant="secondary"
                className="rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-white"
            >
              Дізнатися
            </Button>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
              <p className="font-heading text-2xl font-bold text-brand-madison">
                10+
              </p>
              <p className="mt-1 text-sm leading-5 text-brand-muted">
                років досвіду
              </p>
            </div>

            <div className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm">
              <p className="font-heading text-2xl font-bold text-brand-madison">
                ФОП
              </p>
              <p className="mt-1 text-sm leading-5 text-brand-muted">
                регулярний супровід
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