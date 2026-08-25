"use client";

import { useMediaQuery } from "@relume_io/relume-ui";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Fragment, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";

const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const useScrollItemStyle = (scrollYProgress, index, total) => {
  const startProgress = index / total;
  const endProgress = (index + 1) / total;

  const opacity = useTransform(
      scrollYProgress,
      [
        Math.max(0, startProgress - 0.07),
        startProgress,
        endProgress - 0.07,
        Math.min(1, endProgress),
      ],
      [0, 1, 1, 0],
  );

  const y = useTransform(
      scrollYProgress,
      [
        Math.max(0, startProgress - 0.1),
        startProgress,
        endProgress - 0.1,
        Math.min(1, endProgress),
      ],
      [100, 0, 0, -100],
  );

  return { opacity, y };
};

const useServiceScrollStyles = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const total = 4;

  const firstItemStyle = useScrollItemStyle(scrollYProgress, 0, total);
  const secondItemStyle = useScrollItemStyle(scrollYProgress, 1, total);
  const thirdItemStyle = useScrollItemStyle(scrollYProgress, 2, total);
  const fourthItemStyle = useScrollItemStyle(scrollYProgress, 3, total);

  return {
    containerRef,
    itemStyles: [
      firstItemStyle,
      secondItemStyle,
      thirdItemStyle,
      fourthItemStyle,
    ],
  };
};

const useMobile = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return { isMobile };
};

const useTablet = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  return { isTablet };
};

const ServiceVisual = ({ number, title, label, tone = "light" }) => {
  const isDark = tone === "dark";

  return (
      <div
          className={`flex size-full items-center justify-center rounded-card border p-6 shadow-card ${
              isDark
                  ? "border-white/15 bg-brand-madison text-white"
                  : "border-brand-border bg-white text-brand-ink"
          }`}
      >
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p
                  className={`text-sm font-semibold ${
                      isDark ? "text-white/65" : "text-brand-gothic"
                  }`}
              >
                {label}
              </p>

              <h3
                  className={`mt-1 font-heading text-3xl font-bold ${
                      isDark ? "text-white" : "text-brand-ink"
                  }`}
              >
                {title}
              </h3>
            </div>

            <span
                className={`flex size-12 items-center justify-center rounded-full font-heading text-lg font-bold ${
                    isDark
                        ? "bg-white/10 text-brand-tan"
                        : "bg-brand-pampas text-brand-madison"
                }`}
            >
            {number}
          </span>
          </div>

          <div className="space-y-4">
            <div
                className={`rounded-2xl p-4 ${
                    isDark ? "bg-white/10" : "bg-brand-pampas"
                }`}
            >
              <div className="mb-3 flex items-center justify-between">
              <span
                  className={`text-sm font-medium ${
                      isDark ? "text-white/70" : "text-brand-muted"
                  }`}
              >
                Документи
              </span>

                <span
                    className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-brand-madison"
                    }`}
                >
                Перевірено
              </span>
              </div>

              <div
                  className={`h-2 overflow-hidden rounded-full ${
                      isDark ? "bg-white/15" : "bg-brand-soft"
                  }`}
              >
                <div
                    className={`h-full rounded-full ${
                        isDark ? "w-[86%] bg-brand-tan" : "w-[86%] bg-brand-madison"
                    }`}
                />
              </div>
            </div>

            <div
                className={`rounded-2xl p-4 ${
                    isDark ? "bg-white/10" : "bg-brand-pampas"
                }`}
            >
              <div className="mb-3 flex items-center justify-between">
              <span
                  className={`text-sm font-medium ${
                      isDark ? "text-white/70" : "text-brand-muted"
                  }`}
              >
                Звітність
              </span>

                <span
                    className={`text-sm font-semibold ${
                        isDark ? "text-white" : "text-brand-madison"
                    }`}
                >
                В роботі
              </span>
              </div>

              <div
                  className={`h-2 overflow-hidden rounded-full ${
                      isDark ? "bg-white/15" : "bg-brand-soft"
                  }`}
              >
                <div
                    className={`h-full rounded-full ${
                        isDark ? "w-[64%] bg-white" : "w-[64%] bg-brand-tan"
                    }`}
                />
              </div>
            </div>

            <div
                className={`flex items-center justify-between rounded-2xl p-4 ${
                    isDark ? "bg-white/10" : "bg-brand-pampas"
                }`}
            >
            <span
                className={`text-sm font-medium ${
                    isDark ? "text-white/70" : "text-brand-muted"
                }`}
            >
              Наступний дедлайн
            </span>

              <span
                  className={`text-sm font-semibold ${
                      isDark ? "text-brand-tan" : "text-brand-madison"
                  }`}
              >
              Під контролем
            </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export function HomeServicesShowcase() {
  const tablet = useTablet();
  const mobile = useMobile();

  const render = {
    ...tablet,
    ...mobile,
  };

  const scrollState = useServiceScrollStyles();

  return (
      <section
          ref={scrollState.containerRef}
          className="bg-white px-[5%] py-16 md:py-24 lg:py-28"
      >
        <div className="container">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start md:gap-20">
            <div className="flex flex-col gap-y-16 md:sticky md:top-24 md:mt-20 md:h-[calc(100vh_-10rem)] md:justify-center">
              <div className="flex flex-col">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
                  Послуги
                </p>

                <h2 className="mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                  Що я роблю для вашого бізнесу
                </h2>

                <p className="max-w-xl text-base leading-7 text-brand-muted md:text-md">
                  Від регулярного обліку до податкових декларацій — беру на себе
                  процеси, які потребують точності, строків і уважності до
                  деталей.
                </p>

                {/* There were two <Button>s doing nothing: the first now leads to services,
                    the second is gone, as there is nothing to download yet. */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                      to="/services"
                      className="inline-flex items-center gap-2 rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                  >
                    Переглянути послуги
                    <RxChevronRight className="size-5" />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-start gap-y-8">
                {/* Every direct child of AnimatePresence needs its own key: it
                    tracks children by key to know which one left. A missing key
                    becomes "", so all four blocks shared one key and React
                    warned about duplicates on every render of the home page. */}
                <AnimatePresence>
                  <Fragment key="fop">
                    <ConditionalRender condition={render.isMobile}>
                      <div className="rounded-card border border-brand-border bg-brand-pampas p-6">
                        <h5 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                          Облік для ФОП
                        </h5>

                        <p className="leading-7 text-brand-muted">
                          Регулярне ведення обліку, контроль платежів, підготовка
                          документів і допомога з податковими питаннями для
                          підприємців.
                        </p>

                        <div className="mt-6 h-[360px]">
                          <ServiceVisual
                              number="01"
                              title="ФОП"
                              label="Individual business"
                          />
                        </div>
                      </div>
                    </ConditionalRender>

                    <ConditionalRender condition={render.isTablet}>
                      <motion.div
                          style={scrollState.itemStyles[0]}
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="md:absolute first:md:relative"
                      >
                        <h5 className="font-heading font-bold text-brand-ink md:mb-4 md:text-3xl">
                          Облік для ФОП
                        </h5>

                        <p className="max-w-xl leading-7 text-brand-muted md:text-md">
                          Регулярне ведення обліку, контроль платежів, підготовка
                          документів і допомога з податковими питаннями для
                          підприємців.
                        </p>
                      </motion.div>
                    </ConditionalRender>
                  </Fragment>

                  <Fragment key="small-business">
                    <ConditionalRender condition={render.isMobile}>
                      <div className="rounded-card border border-brand-border bg-brand-pampas p-6">
                        <h5 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                          Облік малого бізнесу
                        </h5>

                        <p className="leading-7 text-brand-muted">
                          Системний супровід для малого бізнесу: документи,
                          звітність, платежі, контроль фінансових процесів і
                          підтримка власника.
                        </p>

                        <div className="mt-6 h-[360px]">
                          <ServiceVisual
                              number="02"
                              title="Бізнес"
                              label="Small business"
                              tone="dark"
                          />
                        </div>
                      </div>
                    </ConditionalRender>

                    <ConditionalRender condition={render.isTablet}>
                      <motion.div
                          style={scrollState.itemStyles[1]}
                          initial={false}
                          animate={{}}
                          transition={{}}
                          className="md:absolute first:md:relative"
                      >
                        <h5 className="font-heading font-bold text-brand-ink md:mb-4 md:text-3xl">
                          Облік малого бізнесу
                        </h5>

                        <p className="max-w-xl leading-7 text-brand-muted md:text-md">
                          Системний супровід для малого бізнесу: документи,
                          звітність, платежі, контроль фінансових процесів і
                          підтримка власника.
                        </p>
                      </motion.div>
                    </ConditionalRender>
                  </Fragment>

                  <Fragment key="tax-advice">
                    <ConditionalRender condition={render.isMobile}>
                      <div className="rounded-card border border-brand-border bg-brand-pampas p-6">
                        <h5 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                          Податкове консультування
                        </h5>

                        <p className="leading-7 text-brand-muted">
                          Пояснюю податкові ризики, допомагаю обрати правильний
                          формат роботи й підготуватися до звітних періодів.
                        </p>

                        <div className="mt-6 h-[360px]">
                          <ServiceVisual
                              number="03"
                              title="Податки"
                              label="Tax consulting"
                          />
                        </div>
                      </div>
                    </ConditionalRender>

                    <ConditionalRender condition={render.isTablet}>
                      <motion.div
                          style={scrollState.itemStyles[2]}
                          initial={false}
                          animate={{}}
                          transition={{}}
                          className="md:absolute first:md:relative"
                      >
                        <h5 className="font-heading font-bold text-brand-ink md:mb-4 md:text-3xl">
                          Податкове консультування
                        </h5>

                        <p className="max-w-xl leading-7 text-brand-muted md:text-md">
                          Пояснюю податкові ризики, допомагаю обрати правильний
                          формат роботи й підготуватися до звітних періодів.
                        </p>
                      </motion.div>
                    </ConditionalRender>
                  </Fragment>

                  <Fragment key="reporting">
                    <ConditionalRender condition={render.isMobile}>
                      <div className="rounded-card border border-brand-border bg-brand-pampas p-6">
                        <h5 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                          Ведення звітності
                        </h5>

                        <p className="leading-7 text-brand-muted">
                          Підготовка квартальних та річних звітів, декларацій і
                          необхідних документів для податкових органів.
                        </p>

                        <div className="mt-6 h-[360px]">
                          <ServiceVisual
                              number="04"
                              title="Звіти"
                              label="Reporting"
                              tone="dark"
                          />
                        </div>
                      </div>
                    </ConditionalRender>

                    <ConditionalRender condition={render.isTablet}>
                      <motion.div
                          style={scrollState.itemStyles[3]}
                          initial={false}
                          animate={{}}
                          transition={{}}
                          className="md:absolute first:md:relative"
                      >
                        <h5 className="font-heading font-bold text-brand-ink md:mb-4 md:text-3xl">
                          Ведення звітності
                        </h5>

                        <p className="max-w-xl leading-7 text-brand-muted md:text-md">
                          Підготовка квартальних та річних звітів, декларацій і
                          необхідних документів для податкових органів.
                        </p>
                      </motion.div>
                    </ConditionalRender>
                  </Fragment>
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-1 md:gap-6">
              <div className="h-screen overflow-hidden rounded-card">
                <ServiceVisual
                    number="01"
                    title="ФОП"
                    label="Individual business"
                />
              </div>

              <div className="h-screen overflow-hidden rounded-card">
                <ServiceVisual
                    number="02"
                    title="Бізнес"
                    label="Small business"
                    tone="dark"
                />
              </div>

              <div className="h-screen overflow-hidden rounded-card">
                <ServiceVisual
                    number="03"
                    title="Податки"
                    label="Tax consulting"
                />
              </div>

              <div className="h-screen overflow-hidden rounded-card">
                <ServiceVisual
                    number="04"
                    title="Звіти"
                    label="Reporting"
                    tone="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}