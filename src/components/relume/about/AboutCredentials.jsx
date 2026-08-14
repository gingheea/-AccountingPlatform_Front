"use client";

import { SOCIAL_LINKS } from "../../../constants/site";
import { Button } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";

export function AboutCredentials() {
  const credentialCardClass =
      "flex min-h-[150px] flex-col justify-between rounded-card border border-brand-border bg-white p-5 shadow-soft transition-shadow hover:shadow-card";

  return (
      <section className="bg-brand-pampas px-[5%] py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                Кваліфікація
              </p>

              <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                Сертифікати та професійна база
              </h2>

              <p className="max-w-xl text-base leading-7 text-brand-muted md:text-md">
                Професійна підготовка, практичний досвід і постійне оновлення
                знань допомагають працювати точно, системно й відповідально.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                    title="Переглянути"
                    variant="secondary"
                    className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Переглянути
                </Button>

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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className={credentialCardClass}>
                <div className="flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  01
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-ink">
                    Бухгалтерський облік
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Робота з доходами, витратами, документами та регулярним
                    обліком.
                  </p>
                </div>
              </div>

              <div className={credentialCardClass}>
                <div className="flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  02
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-ink">
                    Податкове право
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Орієнтація в податкових правилах, строках і звітних
                    обовʼязках.
                  </p>
                </div>
              </div>

              <div className={credentialCardClass}>
                <div className="flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  03
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-ink">
                    Звітність
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Підготовка декларацій, звітів і супровід перед дедлайнами.
                  </p>
                </div>
              </div>

              <div className={credentialCardClass}>
                <div className="flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  04
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-ink">
                    Малий бізнес
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Супровід ФОП, самозайнятих спеціалістів і невеликих команд.
                  </p>
                </div>
              </div>

              <div className={credentialCardClass}>
                <div className="flex size-11 items-center justify-center rounded-button bg-brand-pampas font-heading text-sm font-bold text-brand-madison">
                  05
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-ink">
                    Документообіг
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    Організація рахунків, актів, договорів і податкових файлів.
                  </p>
                </div>
              </div>

              <div className="flex min-h-[150px] flex-col justify-between rounded-card border border-white/15 bg-brand-madison p-5 text-white shadow-card">
                <div className="flex size-11 items-center justify-center rounded-button bg-white/10 font-heading text-sm font-bold text-brand-tan">
                  06
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-white">
                    Постійне оновлення
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Стежу за змінами, щоб клієнти не втрачали контроль над
                    строками та вимогами.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}