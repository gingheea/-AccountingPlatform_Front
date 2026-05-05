"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function ServicesList() {
  const cardNumberClass =
      "mb-5 flex size-12 items-center justify-center rounded-button bg-brand-pampas font-heading text-lg font-bold text-brand-madison";

  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div className="static md:sticky md:top-[30%]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                Послуги
              </p>

              <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                Повний спектр бухгалтерських рішень
              </h2>

              <p className="max-w-xl text-base leading-7 text-brand-muted md:text-md">
                Кожна послуга підбирається під ваш формат роботи: ФОП, малий
                бізнес, регулярна звітність, податкові питання або організація
                документів.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                    title="Портал"
                    variant="secondary"
                    className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Портал
                </Button>

                <Button
                    title="Завантажити"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    className="font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                >
                  Завантажити
                </Button>
              </div>
            </div>

            <div>
              <div
                  className="sticky mb-8 rounded-card border border-brand-border bg-brand-pampas p-8 shadow-soft"
                  style={{ top: "30%" }}
              >
                <div className={cardNumberClass}>01</div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                  Облік ФОП
                </h3>

                <p className="leading-7 text-brand-muted">
                  Ведення обліку для фізичних осіб-підприємців: контроль платежів,
                  підготовка документів, звітність, податкові питання та регулярна
                  підтримка.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-madison">
                  Звітність
                </span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-madison">
                  Податки
                </span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-madison">
                  Документи
                </span>
                </div>
              </div>

              <div
                  className="sticky mb-8 rounded-card border border-brand-border bg-white p-8 shadow-soft"
                  style={{ top: "32%" }}
              >
                <div className={cardNumberClass}>02</div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                  Облік малого бізнесу
                </h3>

                <p className="leading-7 text-brand-muted">
                  Комплексний бухгалтерський супровід для малого бізнесу:
                  документи, регулярні платежі, фінансові процеси, контроль
                  дедлайнів і підтримка власника.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  SMB
                </span>
                  <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Супровід
                </span>
                  <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Контроль
                </span>
                </div>
              </div>

              <div
                  className="sticky mb-8 rounded-card border border-white/15 bg-brand-madison p-8 text-white shadow-card"
                  style={{ top: "34%" }}
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-button bg-white/10 font-heading text-lg font-bold text-brand-tan">
                  03
                </div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-white md:mb-4 md:text-3xl">
                  Податкове консультування
                </h3>

                <p className="leading-7 text-white/75">
                  Допомагаю розібратися з податковими питаннями, оцінити ризики,
                  підготуватися до звітних періодів і вибрати правильний формат
                  роботи.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-tan">
                  Консультація
                </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-tan">
                  Планування
                </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-tan">
                  Ризики
                </span>
                </div>
              </div>

              <div
                  className="sticky mb-8 rounded-card border border-brand-border bg-white p-8 shadow-soft"
                  style={{ top: "36%" }}
              >
                <div className={cardNumberClass}>04</div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                  Звітність та подання
                </h3>

                <p className="leading-7 text-brand-muted">
                  Підготовка квартальних і річних звітів, декларацій та необхідних
                  документів. Контроль строків, щоб уникати штрафів і зайвого
                  стресу.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Декларації
                </span>
                  <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Дедлайни
                </span>
                  <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Подання
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}