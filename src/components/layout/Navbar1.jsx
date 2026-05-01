"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { RxChevronDown } from "react-icons/rx";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
      ? ["open", "rotatePhase"]
      : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

export function Navbar1() {
  const useActive = useRelume();

  const navLinkClass =
      "block py-3 text-base font-medium text-brand-muted transition-colors hover:text-brand-madison lg:px-4 lg:py-2";

  const dropdownLinkClass =
      "block rounded-xl px-4 py-2.5 text-base font-medium text-brand-muted transition-colors hover:bg-brand-pampas hover:text-brand-madison";

  return (
      <section className="sticky top-0 z-50 flex w-full items-center border-b border-brand-border bg-white/95 backdrop-blur-md lg:min-h-[76px] lg:px-[5%]">
        <div className="size-full lg:flex lg:items-center lg:justify-between">
          <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
            <a href="#" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-button bg-brand-madison font-heading text-sm font-bold tracking-wide text-white shadow-soft">
                AP
              </div>

              <div className="flex flex-col leading-tight">
              <span className="font-heading text-base font-bold text-brand-ink">
                Accounting Platform
              </span>
                <span className="hidden text-xs font-medium text-brand-gothic sm:block">
                Outsourced accounting
              </span>
              </div>
            </a>

            <button
                className="-mr-2 flex size-12 flex-col items-center justify-center rounded-xl transition-colors hover:bg-brand-pampas lg:hidden"
                onClick={useActive.toggleMobileMenu}
                aria-label="Open menu"
            >
              <motion.span
                  className="my-[3px] h-0.5 w-6 rounded-full bg-brand-ink"
                  animate={useActive.animateMobileMenuButtonSpan}
                  variants={{
                    open: { translateY: 8, transition: { delay: 0.1 } },
                    rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
                    closed: {
                      translateY: 0,
                      rotate: 0,
                      transition: { duration: 0.2 },
                    },
                  }}
              />
              <motion.span
                  className="my-[3px] h-0.5 w-6 rounded-full bg-brand-ink"
                  animate={useActive.animateMobileMenu}
                  variants={{
                    open: { width: 0, transition: { duration: 0.1 } },
                    closed: {
                      width: "1.5rem",
                      transition: { delay: 0.3, duration: 0.2 },
                    },
                  }}
              />
              <motion.span
                  className="my-[3px] h-0.5 w-6 rounded-full bg-brand-ink"
                  animate={useActive.animateMobileMenuButtonSpan}
                  variants={{
                    open: { translateY: -8, transition: { delay: 0.1 } },
                    rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
                    closed: {
                      translateY: 0,
                      rotate: 0,
                      transition: { duration: 0.2 },
                    },
                  }}
              />
            </button>
          </div>

          <motion.div
              variants={{
                open: { height: "var(--height-open, 100dvh)" },
                close: { height: "var(--height-closed, 0)" },
              }}
              initial="close"
              exit="close"
              animate={useActive.animateMobileMenu}
              transition={{ duration: 0.4 }}
              className="overflow-hidden bg-white px-[5%] shadow-lg lg:flex lg:items-center lg:bg-transparent lg:px-0 lg:shadow-none lg:[--height-closed:auto] lg:[--height-open:auto]"
          >
            <a href="#" className={navLinkClass}>
              Про мене
            </a>

            <a href="#" className={navLinkClass}>
              Послуги
            </a>

            <a href="#" className={navLinkClass}>
              Блог
            </a>

            <div
                className="relative"
                onMouseEnter={useActive.openOnDesktopDropdownMenu}
                onMouseLeave={useActive.closeOnDesktopDropdownMenu}
            >
              <button
                  className="flex w-full items-center justify-between gap-2 py-3 text-left text-base font-medium text-brand-muted transition-colors hover:text-brand-madison lg:flex-none lg:justify-start lg:px-4 lg:py-2"
                  onClick={useActive.openOnMobileDropdownMenu}
              >
                <span>Портал</span>
                <motion.span
                    variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
                    animate={useActive.animateDropdownMenuIcon}
                    transition={{ duration: 0.3 }}
                    className="text-lg"
                >
                  <RxChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                <motion.nav
                    variants={{
                      open: {
                        visibility: "visible",
                        opacity: "var(--opacity-open, 100%)",
                        display: "block",
                        y: 0,
                      },
                      close: {
                        visibility: "hidden",
                        opacity: "var(--opacity-close, 0)",
                        display: "none",
                        y: "var(--y-close, 0%)",
                      },
                    }}
                    animate={useActive.animateDropdownMenu}
                    initial="close"
                    exit="close"
                    transition={{ duration: 0.2 }}
                    className="mb-4 rounded-card border border-brand-border bg-white p-2 shadow-card lg:absolute lg:left-0 lg:top-full lg:z-50 lg:mb-0 lg:mt-3 lg:min-w-52 lg:[--y-close:16px]"
                >
                  <a href="#" className={dropdownLinkClass}>
                    Вхід
                  </a>
                  <a href="#" className={dropdownLinkClass}>
                    Документи
                  </a>
                  <a href="#" className={dropdownLinkClass}>
                    Звіти
                  </a>
                </motion.nav>
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-3 border-t border-brand-border py-5 lg:ml-5 lg:flex-row lg:border-t-0 lg:py-0">
              <Button
                  title="Контакт"
                  variant="secondary"
                  size="sm"
                  className="w-full rounded-button border border-brand-border bg-white px-5 py-2.5 font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas lg:w-auto"
              >
                Контакт
              </Button>

              <Button
                  title="Консультація"
                  size="sm"
                  className="w-full rounded-button bg-brand-madison px-5 py-2.5 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark lg:w-auto"
              >
                Консультація
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
  );
}