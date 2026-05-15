"use client";

import React, { useEffect, useState } from "react";
import { RxChevronRight } from "react-icons/rx";
import { getServices } from "../../../services/servicesService";

export function ServicesList() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const data = await getServices();

        if (!isMounted) return;

        const sortedServices = [...data].sort(
            (a, b) => a.sortOrder - b.sortOrder,
        );

        setServices(sortedServices);
      } catch (error) {
        console.error("Failed to load services:", error);

        if (!isMounted) return;

        setErrorMessage(
            "Не вдалося завантажити послуги. Спробуйте оновити сторінку.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const cardNumberClass =
      "mb-5 flex size-12 items-center justify-center rounded-button bg-brand-pampas font-heading text-lg font-bold text-brand-madison";

  const getCardClass = (index) => {
    if (index === 2) {
      return "sticky mb-8 rounded-card border border-white/15 bg-brand-madison p-8 text-white shadow-card";
    }

    if (index === 0) {
      return "sticky mb-8 rounded-card border border-brand-border bg-brand-pampas p-8 shadow-soft";
    }

    return "sticky mb-8 rounded-card border border-brand-border bg-white p-8 shadow-soft";
  };

  const getTopOffset = (index) => `${30 + index * 2}%`;

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
                <a
                    href="/#quick-consultation"
                    className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                  Отримати консультацію
                </a>

                <a
                    href="#pricing"
                    className="inline-flex items-center gap-2 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                >
                  Переглянути тарифи
                  <RxChevronRight />
                </a>
              </div>
            </div>

            <div>
              {isLoading && (
                  <div className="rounded-card border border-brand-border bg-brand-pampas p-8 shadow-soft">
                    <div className={cardNumberClass}>...</div>

                    <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                      Завантаження послуг
                    </h3>

                    <p className="leading-7 text-brand-muted">
                      Дані завантажуються з сервера.
                    </p>
                  </div>
              )}

              {!isLoading && errorMessage && (
                  <div className="rounded-card border border-brand-border bg-brand-pampas p-8 shadow-soft">
                    <div className={cardNumberClass}>!</div>

                    <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                      Помилка завантаження
                    </h3>

                    <p className="leading-7 text-brand-muted">{errorMessage}</p>
                  </div>
              )}

              {!isLoading && !errorMessage && services.length === 0 && (
                  <div className="rounded-card border border-brand-border bg-brand-pampas p-8 shadow-soft">
                    <div className={cardNumberClass}>0</div>

                    <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-brand-ink md:mb-4 md:text-3xl">
                      Послуги ще не додані
                    </h3>

                    <p className="leading-7 text-brand-muted">
                      Після додавання послуг в адмінці вони автоматично зʼявляться
                      тут.
                    </p>
                  </div>
              )}

              {!isLoading &&
                  !errorMessage &&
                  services.map((service, index) => {
                    const isDark = index === 2;

                    return (
                        <div
                            key={service.id}
                            className={getCardClass(index)}
                            style={{ top: getTopOffset(index) }}
                        >
                          <div
                              className={
                                isDark
                                    ? "mb-5 flex size-12 items-center justify-center rounded-button bg-white/10 font-heading text-lg font-bold text-brand-tan"
                                    : cardNumberClass
                              }
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <h3
                              className={`mb-3 font-heading text-2xl font-bold leading-tight md:mb-4 md:text-3xl ${
                                  isDark ? "text-white" : "text-brand-ink"
                              }`}
                          >
                            {service.name}
                          </h3>

                          <p
                              className={`leading-7 ${
                                  isDark ? "text-white/75" : "text-brand-muted"
                              }`}
                          >
                            {service.description}
                          </p>

                          {service.tags?.length > 0 && (
                              <div className="mt-6 flex flex-wrap gap-3">
                                {service.tags.map((tag) => (
                                    <span
                                        key={`${service.id}-${tag}`}
                                        className={
                                          isDark
                                              ? "rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-tan"
                                              : index === 0
                                                  ? "rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-madison"
                                                  : "rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison"
                                        }
                                    >
                            {tag}
                          </span>
                                ))}
                              </div>
                          )}
                        </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </section>
  );
}