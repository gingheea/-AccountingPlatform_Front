"use client";

import { useNewsletterForm } from "../../../hooks/useNewsletterForm";
import { Button, Input } from "@relume_io/relume-ui";

export function HomeNewsletterCta() {
  const formState = useNewsletterForm("home");

  return (
      <section className="bg-brand-pampas px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-card border border-brand-border bg-white p-8 shadow-card md:p-12 lg:p-16">
            <div className="absolute right-0 top-0 hidden h-40 w-40 rounded-bl-[4rem] bg-brand-madison/5 md:block" />
            <div className="absolute bottom-0 left-0 hidden h-32 w-32 rounded-tr-[4rem] bg-brand-tan/20 md:block" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="max-w-2xl text-center">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                  Блог та оновлення
                </p>

                <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
                  Корисні поради для підприємців
                </h2>

                <p className="mx-auto max-w-xl text-base leading-7 text-brand-muted md:text-md">
                  Щомісяця я ділюся практичними порадами про облік, податки,
                  документи та управління бізнесом.
                </p>
              </div>

              <div className="mx-auto mt-8 w-full max-w-xl md:mt-10">
                <form
                    className="rb-4 mb-4 grid grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
                    onSubmit={formState.handleSubmit}
                >
                  <Input
                      id="email"
                      type="email"
                      placeholder="Введіть вашу пошту"
                      value={formState.email}
                      onChange={formState.handleSetEmail}
                      className="min-h-12 rounded-button border-brand-border bg-white px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
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

                <p className="text-center text-xs leading-5 text-brand-muted">
                  Натиснувши “Підписатися”, ви погоджуєтеся з умовами використання
                  та політикою конфіденційності.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}