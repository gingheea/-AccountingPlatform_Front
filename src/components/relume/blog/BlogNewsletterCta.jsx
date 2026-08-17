"use client";

import { useNewsletterForm } from "../../../hooks/useNewsletterForm";
import { Button, Input } from "@relume_io/relume-ui";
import React from "react";

export function BlogNewsletterCta() {
  const formState = useNewsletterForm("blog");

  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-card">
            <div className="grid auto-cols-fr grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                  Розсилка
                </p>

                <h2 className="mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                  Отримуйте поради прямо в пошту
                </h2>

                <p className="max-w-xl text-base leading-7 text-brand-muted md:text-md">
                  Підпишіться на розсилку, щоб отримувати практичні поради про
                  облік, податки, документи та важливі зміни для підприємців.
                </p>

                <div className="mt-8 w-full max-w-xl">
                  <form
                      className="rb-4 mb-4 grid w-full grid-cols-1 gap-y-3 rounded-card border border-brand-border bg-brand-pampas p-3 sm:grid-cols-[1fr_max-content] sm:gap-3"
                      onSubmit={formState.handleSubmit}
                  >
                    <Input
                        id="email"
                        type="email"
                        placeholder="Введіть вашу пошту"
                        value={formState.email}
                        onChange={formState.handleSetEmail}
                        className="min-h-12 rounded-button border-transparent bg-white px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />

                    <Button
                        type="submit"
                        title="Підписатися"
                        variant="primary"
                        size="sm"
                        disabled={formState.isSubmitting}
                        className="min-h-12 items-center justify-center rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {formState.isSubmitting ? "Надсилання..." : "Підписатися"}
                    </Button>
                  </form>

                  <p className="text-xs leading-5 text-brand-muted">
                    Натискаючи “Підписатися”, ви погоджуєтесь з умовами
                    конфіденційності та отриманням інформаційних оновлень.
                  </p>
                </div>
              </div>

              <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-brand-madison p-8 md:min-h-[480px] lg:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,175,123,0.35),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />

                <div className="relative z-10 w-full max-w-md rounded-card border border-white/15 bg-white p-6 shadow-card">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-brand-gothic">
                        Monthly digest
                      </p>

                      <h3 className="mt-1 font-heading text-2xl font-bold text-brand-ink">
                        Новини для підприємців
                      </h3>
                    </div>

                    <span className="rounded-full bg-brand-pampas px-3 py-1 text-xs font-semibold text-brand-madison">
                    Email
                  </span>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl bg-brand-pampas p-4">
                      <p className="text-sm font-semibold text-brand-ink">
                        Податкові зміни
                      </p>
                      <p className="mt-1 text-xs leading-5 text-brand-muted">
                        Коротко про те, що важливо знати цього місяця.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-brand-pampas p-4">
                      <p className="text-sm font-semibold text-brand-ink">
                        Документи та дедлайни
                      </p>
                      <p className="mt-1 text-xs leading-5 text-brand-muted">
                        Що підготувати, щоб не пропустити строки.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-brand-pampas p-4">
                      <p className="text-sm font-semibold text-brand-ink">
                        Практичні поради
                      </p>
                      <p className="mt-1 text-xs leading-5 text-brand-muted">
                        Як тримати облік у порядку без зайвого стресу.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-8 top-8 hidden rounded-full bg-brand-tan px-4 py-2 text-sm font-semibold text-brand-ink shadow-soft md:block">
                  1 раз на місяць
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}