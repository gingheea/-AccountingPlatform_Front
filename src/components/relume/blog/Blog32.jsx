"use client";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronRight } from "react-icons/rx";

const useRelume = ({ defaultValue, selects }) => {
  const [activeSelect, setActiveSelect] = useState(defaultValue);

  const currentSelect = selects.find(function (select) {
    return select.value === activeSelect;
  });

  return { activeSelect, setActiveSelect, currentSelect };
};

const BlogVisual = ({ number, category, tone = "light" }) => {
  const isDark = tone === "dark";

  return (
      <div
          className={`flex aspect-square w-full items-center justify-center rounded-card border p-6 shadow-soft ${
              isDark
                  ? "border-white/15 bg-brand-madison text-white"
                  : "border-brand-border bg-brand-pampas text-brand-ink"
          }`}
      >
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
          <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark
                      ? "bg-white/10 text-brand-tan"
                      : "bg-white text-brand-madison"
              }`}
          >
            {category}
          </span>

            <span
                className={`font-heading text-3xl font-bold ${
                    isDark ? "text-white/25" : "text-brand-madison/20"
                }`}
            >
            {number}
          </span>
          </div>

          <div
              className={`space-y-3 rounded-2xl p-4 ${
                  isDark ? "bg-white/10" : "bg-white"
              }`}
          >
            <div
                className={`h-2 w-3/4 rounded-full ${
                    isDark ? "bg-brand-tan" : "bg-brand-madison"
                }`}
            />
            <div
                className={`h-2 w-full rounded-full ${
                    isDark ? "bg-white/25" : "bg-brand-soft"
                }`}
            />
            <div
                className={`h-2 w-2/3 rounded-full ${
                    isDark ? "bg-white/25" : "bg-brand-soft"
                }`}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div
                className={`h-16 rounded-2xl ${
                    isDark ? "bg-white/10" : "bg-white"
                }`}
            />
            <div
                className={`h-16 rounded-2xl ${
                    isDark ? "bg-white/10" : "bg-white"
                }`}
            />
            <div
                className={`h-16 rounded-2xl ${
                    isDark ? "bg-brand-tan/30" : "bg-brand-tan/30"
                }`}
            />
          </div>
        </div>
      </div>
  );
};

export function Blog32() {
  const useActive = useRelume({
    defaultValue: "all-posts",
    selects: [
      {
        value: "all-posts",
        trigger: "Всі публікації",
        content: [],
      },
      {
        value: "category-one",
        trigger: "Податкове право",
        content: [],
      },
      {
        value: "category-two",
        trigger: "Облік та звітність",
        content: [],
      },
      {
        value: "category-three",
        trigger: "Розвиток бізнесу",
        content: [],
      },
      {
        value: "category-four",
        trigger: "Законодавчі зміни",
        content: [],
      },
    ],
  });

  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container flex flex-col">
          <div className="mx-auto mb-12 max-w-4xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Блог
            </p>

            <h1 className="mb-5 font-heading text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink md:mb-6 md:text-7xl lg:text-8xl">
              Актуальні новини та поради
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Практичні матеріали про облік, податки, документи та рішення для
              підприємців і малого бізнесу.
            </p>
          </div>

          <div className="flex flex-col justify-start">
            <div className="mb-10 flex justify-center">
              <Select
                  value={useActive.activeSelect}
                  onValueChange={useActive.setActiveSelect}
              >
                <SelectTrigger className="min-h-12 min-w-[14rem] rounded-button border border-brand-border bg-brand-pampas px-4 py-2 font-medium text-brand-ink shadow-sm md:w-auto">
                  {useActive.currentSelect?.trigger ?? "Всі публікації"}
                </SelectTrigger>

                <SelectContent className="rounded-card border-brand-border bg-white shadow-card">
                  <SelectItem value="all-posts">Всі публікації</SelectItem>
                  <SelectItem value="category-one">Податкове право</SelectItem>
                  <SelectItem value="category-two">Облік та звітність</SelectItem>
                  <SelectItem value="category-three">
                    Розвиток бізнесу
                  </SelectItem>
                  <SelectItem value="category-four">
                    Законодавчі зміни
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                  key={useActive.activeSelect}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-8 md:gap-y-10">
                  <div className="grid gap-x-8 gap-y-6 rounded-card border border-brand-border bg-white p-5 shadow-soft transition-shadow hover:shadow-card md:grid-cols-[0.42fr_1fr] md:gap-x-10 md:p-6">
                    <a href="#" className="w-full">
                      <BlogVisual number="01" category="Податки" tone="dark" />
                    </a>

                    <div className="flex h-full flex-col items-start justify-center">
                      <div className="rb-4 mb-4 flex w-full flex-wrap items-center justify-start gap-3">
                        <p className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                          Податки
                        </p>

                        <p className="inline text-sm font-semibold text-brand-gothic">
                          7 хвилин читання
                        </p>
                      </div>

                      <a className="mb-3" href="#">
                        <h3 className="font-heading text-2xl font-bold leading-tight text-brand-ink transition-colors hover:text-brand-madison md:text-3xl">
                          Як правильно вести облік ФОП
                        </h3>
                      </a>

                      <p className="max-w-2xl leading-7 text-brand-muted">
                        Розбираємо базові правила обліку, документи, платежі та
                        звітність, які допомагають підприємцю уникнути хаосу.
                      </p>

                      <Button
                          className="mt-6 flex items-center justify-center gap-x-2 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                          variant="link"
                          size="link"
                      >
                        Читати далі
                        <RxChevronRight />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-x-8 gap-y-6 rounded-card border border-brand-border bg-brand-pampas p-5 shadow-soft transition-shadow hover:shadow-card md:grid-cols-[0.42fr_1fr] md:gap-x-10 md:p-6">
                    <a href="#" className="w-full">
                      <BlogVisual number="02" category="Зміни" />
                    </a>

                    <div className="flex h-full flex-col items-start justify-center">
                      <div className="rb-4 mb-4 flex w-full flex-wrap items-center justify-start gap-3">
                        <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-madison">
                          Законодавство
                        </p>

                        <p className="inline text-sm font-semibold text-brand-gothic">
                          5 хвилин читання
                        </p>
                      </div>

                      <a className="mb-3" href="#">
                        <h3 className="font-heading text-2xl font-bold leading-tight text-brand-ink transition-colors hover:text-brand-madison md:text-3xl">
                          Податкові зміни у 2024 році
                        </h3>
                      </a>

                      <p className="max-w-2xl leading-7 text-brand-muted">
                        Що змінилося в податковому законодавстві та як ці зміни
                        можуть вплинути на підприємців і малий бізнес.
                      </p>

                      <Button
                          className="mt-6 flex items-center justify-center gap-x-2 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                          variant="link"
                          size="link"
                      >
                        Читати далі
                        <RxChevronRight />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-x-8 gap-y-6 rounded-card border border-brand-border bg-white p-5 shadow-soft transition-shadow hover:shadow-card md:grid-cols-[0.42fr_1fr] md:gap-x-10 md:p-6">
                    <a href="#" className="w-full">
                      <BlogVisual number="03" category="Бізнес" />
                    </a>

                    <div className="flex h-full flex-col items-start justify-center">
                      <div className="rb-4 mb-4 flex w-full flex-wrap items-center justify-start gap-3">
                        <p className="rounded-full bg-brand-pampas px-3 py-1 text-sm font-semibold text-brand-madison">
                          Розвиток
                        </p>

                        <p className="inline text-sm font-semibold text-brand-gothic">
                          6 хвилин читання
                        </p>
                      </div>

                      <a className="mb-3" href="#">
                        <h3 className="font-heading text-2xl font-bold leading-tight text-brand-ink transition-colors hover:text-brand-madison md:text-3xl">
                          Стратегія зростання для малого бізнесу
                        </h3>
                      </a>

                      <p className="max-w-2xl leading-7 text-brand-muted">
                        Практичні поради щодо контролю витрат, планування
                        платежів, масштабування та фінансової дисципліни.
                      </p>

                      <Button
                          className="mt-6 flex items-center justify-center gap-x-2 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
                          variant="link"
                          size="link"
                      >
                        Читати далі
                        <RxChevronRight />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
  );
}