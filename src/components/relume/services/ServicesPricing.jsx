"use client";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { getPricingPackages } from "../../../services/pricingPackagesService";

export function ServicesPricing() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPricingPackages() {
      try {
        const data = await getPricingPackages();

        if (!isMounted) return;

        const sortedPackages = [...data].sort(
            (a, b) => a.sortOrder - b.sortOrder,
        );

        setPackages(sortedPackages);
      } catch (error) {
        console.error("Failed to load pricing packages:", error);

        if (!isMounted) return;

        setErrorMessage(
            "Не вдалося завантажити тарифи. Спробуйте оновити сторінку.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPricingPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  const featureClass = "flex items-start gap-3";

  const getCardClass = (pricingPackage) => {
    if (pricingPackage.isRecommended) {
      return "relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-white/15 bg-brand-madison p-6 text-white shadow-card md:p-8";
    }

    if (pricingPackage.sortOrder === 3) {
      return "flex h-full flex-col justify-between rounded-card border border-brand-border bg-brand-pampas p-6 shadow-soft md:p-8";
    }

    return "flex h-full flex-col justify-between rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8";
  };

  const getBadgeClass = (pricingPackage) => {
    if (pricingPackage.isRecommended) {
      return "mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-tan";
    }

    if (pricingPackage.sortOrder === 3) {
      return "mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-madison";
    }

    return "mb-4 inline-flex rounded-full bg-brand-pampas px-4 py-2 text-sm font-semibold text-brand-madison";
  };

  const getCheckClass = (pricingPackage) => {
    if (pricingPackage.isRecommended) {
      return "mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white/10 text-brand-tan";
    }

    if (pricingPackage.sortOrder === 3) {
      return "mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-white text-brand-madison";
    }

    return "mt-0.5 flex size-6 flex-none items-center justify-center rounded-full bg-brand-pampas text-brand-madison";
  };

  const getButtonClass = (pricingPackage) => {
    if (pricingPackage.isRecommended) {
      return "relative z-10 w-full rounded-button bg-white px-6 py-3 text-center font-semibold text-brand-madison shadow-soft transition-colors hover:bg-brand-pampas";
    }

    if (pricingPackage.sortOrder === 3) {
      return "w-full rounded-button border border-brand-madison bg-white px-6 py-3 text-center font-semibold text-brand-madison transition-colors hover:bg-brand-madison hover:text-white";
    }

    return "w-full rounded-button bg-brand-madison px-6 py-3 text-center font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark";
  };

  if (isLoading) {
    return (
        <section
            id="pricing"
            className="bg-white px-[5%] py-16 md:py-24 lg:py-28"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                Ціни
              </p>

              <h2 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-6xl lg:text-7xl">
                Завантаження тарифів
              </h2>

              <p className="mt-5 text-base leading-7 text-brand-muted md:text-md">
                Дані завантажуються з сервера.
              </p>
            </div>
          </div>
        </section>
    );
  }

  if (errorMessage) {
    return (
        <section
            id="pricing"
            className="bg-white px-[5%] py-16 md:py-24 lg:py-28"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-card border border-brand-border bg-brand-pampas p-8 text-center shadow-soft">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                Ціни
              </p>

              <h2 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-6xl">
                Помилка завантаження
              </h2>

              <p className="mt-5 text-base leading-7 text-brand-muted">
                {errorMessage}
              </p>
            </div>
          </div>
        </section>
    );
  }

  if (packages.length === 0) {
    return (
        <section
            id="pricing"
            className="bg-white px-[5%] py-16 md:py-24 lg:py-28"
        >
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-card border border-brand-border bg-brand-pampas p-8 text-center shadow-soft">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                Ціни
              </p>

              <h2 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-6xl">
                Тарифи ще не додані
              </h2>

              <p className="mt-5 text-base leading-7 text-brand-muted">
                Після додавання пакетів у базу даних вони автоматично зʼявляться
                тут.
              </p>
            </div>
          </div>
        </section>
    );
  }

  return (
      <section
          id="pricing"
          className="scroll-mt-28 bg-white px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Ціни
            </p>

            <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Прозорі тарифи
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Оберіть план під свій формат роботи. Остаточна вартість залежить від
              кількості документів, звітності та потрібного рівня супроводу.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {packages.map((pricingPackage) => {
              const isRecommended = pricingPackage.isRecommended;

              return (
                  <div key={pricingPackage.id} className={getCardClass(pricingPackage)}>
                    {isRecommended && (
                        <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-brand-tan/25" />
                    )}

                    <div className={isRecommended ? "relative z-10" : ""}>
                      <div className="rb-6 mb-8 text-center">
                        {pricingPackage.badge && (
                            <p className={getBadgeClass(pricingPackage)}>
                              {pricingPackage.badge}
                            </p>
                        )}

                        <h6
                            className={`font-heading text-xl font-bold ${
                                isRecommended ? "text-white" : "text-brand-ink"
                            }`}
                        >
                          {pricingPackage.name}
                        </h6>

                        <div className="my-4 flex items-end justify-center gap-2">
                      <span
                          className={`font-heading text-6xl font-bold tracking-[-0.04em] md:text-7xl ${
                              isRecommended ? "text-white" : "text-brand-ink"
                          }`}
                      >
                        {pricingPackage.price}
                      </span>

                          {pricingPackage.priceLabel && (
                              <span
                                  className={`mb-3 text-base font-medium ${
                                      isRecommended ? "text-white/65" : "text-brand-muted"
                                  }`}
                              >
                          {pricingPackage.priceLabel}
                        </span>
                          )}
                        </div>

                        {pricingPackage.periodLabel && (
                            <p
                                className={
                                  isRecommended ? "text-white/65" : "text-brand-muted"
                                }
                            >
                              {pricingPackage.periodLabel}
                            </p>
                        )}
                      </div>

                      {pricingPackage.features?.length > 0 && (
                          <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                            {pricingPackage.features.map((feature) => (
                                <div
                                    key={`${pricingPackage.id}-${feature}`}
                                    className={featureClass}
                                >
                                  <div className={getCheckClass(pricingPackage)}>
                                    <BiCheck className="size-5" />
                                  </div>

                                  <p
                                      className={`leading-6 ${
                                          isRecommended
                                              ? "text-white/75"
                                              : "text-brand-muted"
                                      }`}
                                  >
                                    {feature}
                                  </p>
                                </div>
                            ))}
                          </div>
                      )}
                    </div>

                    <Link
                        to="/#quick-consultation"
                        className={getButtonClass(pricingPackage)}
                    >
                      Обрати
                    </Link>
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}