"use client";

import { Button } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronRight } from "react-icons/rx";

const useRelume = () => {
  const [hoveredFeatureIdx, setHoveredFeatureIdx] = useState(null);

  const handleMouseEnter = (index) => () => {
    setHoveredFeatureIdx(index);
  };

  const handleMouseLeave = () => {
    setHoveredFeatureIdx(null);
  };

  const startAnimation = (index) => {
    return hoveredFeatureIdx === index ? "visible" : "hidden";
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    startAnimation,
  };
};

export function HomeWhyChooseMe() {
  const hoverState = useRelume();

  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Чому я
            </p>

            <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Три причини обрати мій підхід
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Бухгалтерський супровід має бути не складним, а зрозумілим,
              безпечним і передбачуваним для власника бізнесу.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 md:gap-8 lg:flex-row">
            <a
                href="#"
                className="relative flex w-full flex-col overflow-hidden rounded-card border border-white/15 bg-brand-madison shadow-card lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
                onMouseOver={hoverState.handleMouseEnter(0)}
                onMouseLeave={hoverState.handleMouseLeave}
            >
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,175,123,0.35),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent)]" />
                <div className="absolute left-8 top-8 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/85">
                  Secure
                </div>
              </div>

              <div className="group relative flex h-full min-h-[520px] flex-col justify-end p-6 md:p-8 lg:min-h-[70vh]">
                <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-black/10" />

                <div className="z-10">
                  <p className="mb-2 font-semibold text-brand-tan">
                    Конфіденційність
                  </p>

                  <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl md:leading-[1.25] lg:text-4xl">
                    Ваші документи, цифри та податкові питання залишаються під
                    контролем
                  </h3>

                  <div className="lg:hidden">
                    <p className="mt-5 leading-7 text-white/75 md:mt-6">
                      Кожен документ і кожна фінансова деталь обробляються
                      уважно, без зайвого доступу третіх осіб.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Button
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          className="font-semibold text-white"
                      >
                        Дізнатися
                      </Button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  <motion.div
                      className="z-10 hidden lg:block lg:w-[360px]"
                      variants={{
                        hidden: { opacity: 0, height: 0, y: 50 },
                        visible: { opacity: 1, height: "auto", y: 0 },
                      }}
                      initial="hidden"
                      animate={hoverState.startAnimation(0)}
                      exit="hidden"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-5 leading-7 text-white/75 md:mt-6">
                      Кожен документ і кожна фінансова деталь обробляються уважно,
                      структуровано та без зайвого доступу третіх осіб.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Button
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          className="font-semibold text-white"
                      >
                        Дізнатися
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>

            <a
                href="#"
                className="relative flex w-full flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
                onMouseOver={hoverState.handleMouseEnter(1)}
                onMouseLeave={hoverState.handleMouseLeave}
            >
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,58,102,0.12),transparent_34%),linear-gradient(135deg,rgba(247,245,242,0.95),rgba(255,255,255,0.95))]" />
                <div className="absolute left-8 top-8 rounded-full bg-brand-madison/10 px-4 py-2 text-sm font-semibold text-brand-madison">
                  Clear process
                </div>
              </div>

              <div className="group relative flex h-full min-h-[520px] flex-col justify-end p-6 md:p-8 lg:min-h-[70vh]">
                <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-brand-madison/[0.03]" />

                <div className="z-10">
                  <p className="mb-2 font-semibold text-brand-madison">
                    Зрозумілий облік
                  </p>

                  <h3 className="font-heading text-2xl font-bold leading-tight text-brand-ink md:text-3xl md:leading-[1.25] lg:text-4xl">
                    Ви завжди розумієте, що відбувається з податками, звітністю та
                    документами
                  </h3>

                  <div className="lg:hidden">
                    <p className="mt-5 leading-7 text-brand-muted md:mt-6">
                      Без складних пояснень і хаосу: ви отримуєте чіткі кроки,
                      дедлайни та зрозумілу комунікацію.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Button
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          className="font-semibold text-brand-madison"
                      >
                        Дізнатися
                      </Button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  <motion.div
                      className="z-10 hidden lg:block lg:w-[360px]"
                      variants={{
                        hidden: { opacity: 0, height: 0, y: 50 },
                        visible: { opacity: 1, height: "auto", y: 0 },
                      }}
                      initial="hidden"
                      animate={hoverState.startAnimation(1)}
                      exit="hidden"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-5 leading-7 text-brand-muted md:mt-6">
                      Без складних пояснень і хаосу: ви отримуєте чіткі кроки,
                      дедлайни, зрозумілі відповіді та регулярну комунікацію.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Button
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          className="font-semibold text-brand-madison"
                      >
                        Дізнатися
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>

            <a
                href="#"
                className="relative flex w-full flex-col overflow-hidden rounded-card border border-brand-border bg-white shadow-card lg:h-full lg:w-1/2 lg:transition-all lg:duration-200 lg:hover:w-[70%]"
                onMouseOver={hoverState.handleMouseEnter(2)}
                onMouseLeave={hoverState.handleMouseLeave}
            >
              <div className="absolute inset-0 flex size-full flex-col items-center justify-center self-start">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,175,123,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(247,245,242,0.95))]" />
                <div className="absolute left-8 top-8 rounded-full bg-brand-tan/25 px-4 py-2 text-sm font-semibold text-brand-ink">
                  Online portal
                </div>
              </div>

              <div className="group relative flex h-full min-h-[520px] flex-col justify-end p-6 md:p-8 lg:min-h-[70vh]">
                <div className="lg:absolute lg:inset-0 lg:z-0 lg:transition-all lg:duration-300 lg:group-hover:bg-brand-tan/[0.04]" />

                <div className="z-10">
                  <p className="mb-2 font-semibold text-brand-madison">
                    Документи онлайн
                  </p>

                  <h3 className="font-heading text-2xl font-bold leading-tight text-brand-ink md:text-3xl md:leading-[1.25] lg:text-4xl">
                    Звіти, акти, рахунки та податкові документи зібрані в одному
                    місці
                  </h3>

                  <div className="lg:hidden">
                    <p className="mt-5 leading-7 text-brand-muted md:mt-6">
                      Ви не губите файли в месенджерах і пошті — документи можна
                      передавати та перевіряти структуровано.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Button
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          className="font-semibold text-brand-madison"
                      >
                        Дізнатися
                      </Button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  <motion.div
                      className="z-10 hidden lg:block lg:w-[360px]"
                      variants={{
                        hidden: { opacity: 0, height: 0, y: 50 },
                        visible: { opacity: 1, height: "auto", y: 0 },
                      }}
                      initial="hidden"
                      animate={hoverState.startAnimation(2)}
                      exit="hidden"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="mt-5 leading-7 text-brand-muted md:mt-6">
                      Ви не губите файли в месенджерах і пошті — документи можна
                      передавати, перевіряти та зберігати структуровано.
                    </p>

                    <div className="mt-6 md:mt-8">
                      <Button
                          variant="link"
                          size="link"
                          iconRight={<RxChevronRight />}
                          className="font-semibold text-brand-madison"
                      >
                        Дізнатися
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </a>
          </div>
        </div>
      </section>
  );
}