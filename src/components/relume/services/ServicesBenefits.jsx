"use client";

import { RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";

export function ServicesBenefits() {
  const cardNumberClass =
      "mb-5 flex size-12 items-center justify-center rounded-button bg-brand-pampas font-heading text-lg font-bold text-brand-madison";

  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
            <div className="static md:sticky md:top-[30%]">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                Переваги
              </p>

              <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                Чому обирають такий формат бухгалтерії
              </h2>

              <p className="max-w-xl text-base leading-7 text-brand-muted md:text-md">
                Ви отримуєте не просто підготовку звітів, а зрозумілу систему:
                документи, дедлайни, консультації та підтримку без зайвої
                бюрократії.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                    to="/portal"
                    className="inline-flex items-center gap-2 rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Кабінет клієнта
                  <RxChevronRight className="size-5" />
                </Link>
              </div>
            </div>

            <div>
              <div
                  className="sticky mb-8 rounded-card border border-brand-border bg-white p-8 shadow-soft"
                  style={{ top: "30%" }}
              >
                <div className={cardNumberClass}>01</div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                  Гнучкі тарифи
                </h3>

                <p className="leading-7 text-brand-muted">
                  Ви платите за той обсяг супроводу, який справді потрібен вашому
                  бізнесу. Формат роботи можна адаптувати, коли змінюються задачі,
                  документи або навантаження.
                </p>

                <div className="mt-6 rounded-2xl bg-brand-pampas p-4">
                  <p className="text-sm font-semibold text-brand-madison">
                    Підходить для:
                  </p>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">
                    ФОП, консультантів, онлайн-магазинів і малого бізнесу.
                  </p>
                </div>
              </div>

              <div
                  className="sticky mb-8 rounded-card border border-brand-border bg-white p-8 shadow-soft"
                  style={{ top: "32%" }}
              >
                <div className={cardNumberClass}>02</div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                  Онлайн-супровід
                </h3>

                <p className="leading-7 text-brand-muted">
                  Документи, питання, звіти та консультації можна вести
                  дистанційно. Це зручно, якщо ви не хочете витрачати час на
                  офлайн-зустрічі та пересилання файлів хаотично.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Email
                </span>
                  <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Telegram
                </span>
                  <span className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                  Portal
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
                  Персоналізований підхід
                </h3>

                <p className="leading-7 text-white/75">
                  Пакет послуг підбирається не “по шаблону”, а під вашу реальну
                  ситуацію: тип діяльності, кількість документів, податкові
                  обовʼязки та рівень потрібної підтримки.
                </p>

                <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <p className="text-sm font-semibold text-brand-tan">
                    Головна ідея:
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Спочатку розбираємо задачу, потім підбираємо рішення.
                  </p>
                </div>
              </div>

              <div
                  className="sticky mb-8 rounded-card border border-brand-border bg-white p-8 shadow-soft"
                  style={{ top: "36%" }}
              >
                <div className={cardNumberClass}>04</div>

                <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                  Швидкі відповіді
                </h3>

                <p className="leading-7 text-brand-muted">
                  Коли виникає питання щодо платежу, документа або звітності, ви
                  отримуєте зрозумілу відповідь без складних пояснень і зайвого
                  очікування.
                </p>

                <div className="mt-6 rounded-2xl bg-brand-pampas p-4">
                  <p className="text-sm font-semibold text-brand-madison">
                    Особливо важливо:
                  </p>
                  <p className="mt-1 text-sm leading-6 text-brand-muted">
                    Перед дедлайнами, поданням звітів і змінами в документах.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}