"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function HomeAboutIntro() {
  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid items-start gap-10 rounded-card border border-brand-border bg-white p-8 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-12 lg:gap-20 lg:p-16">
            <div className="w-full max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                Про мене
              </p>

              <h1 className="font-heading text-4xl font-bold leading-tight tracking-[-0.03em] text-brand-ink md:text-6xl lg:text-7xl">
                Незалежний бухгалтер для підприємців і малого бізнесу
              </h1>
            </div>

            <div className="w-full max-w-2xl">
              <p className="text-base leading-7 text-brand-muted md:text-md">
                Більше десяти років я допомагаю підприємцям розібратися з обліком,
                податками, звітністю та документами. Працюю з ФОП,
                самозайнятими спеціалістами та малим бізнесом, щоб фінансові
                процеси були зрозумілими, контрольованими й без зайвого стресу.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-brand-pampas p-5">
                  <p className="font-heading text-3xl font-bold text-brand-madison">
                    10+
                  </p>
                  <p className="mt-2 text-sm leading-5 text-brand-muted">
                    років практичного досвіду
                  </p>
                </div>

                <div className="rounded-2xl bg-brand-pampas p-5">
                  <p className="font-heading text-3xl font-bold text-brand-madison">
                    ФОП
                  </p>
                  <p className="mt-2 text-sm leading-5 text-brand-muted">
                    регулярний облік і звітність
                  </p>
                </div>

                <div className="rounded-2xl bg-brand-pampas p-5">
                  <p className="font-heading text-3xl font-bold text-brand-madison">
                    SMB
                  </p>
                  <p className="mt-2 text-sm leading-5 text-brand-muted">
                    підтримка малого бізнесу
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                    title="Дізнатися"
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Дізнатися
                </Button>

                <Button
                    title="Портал"
                    variant="secondary"
                    className="rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas"
                >
                  Портал
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}