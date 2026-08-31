"use client";

import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { useAuth } from "../../hooks/useAuth";
import { getHomeRouteForRoles } from "../../utils/jwt";

const navLinkClass =
    "block py-3 text-base font-medium text-brand-muted transition-colors hover:text-brand-madison lg:px-4 lg:py-2";

const dropdownLinkClass =
    "block rounded-xl px-4 py-2.5 text-base font-medium text-brand-muted transition-colors hover:bg-brand-pampas hover:text-brand-madison";

/**
 * A guest sees the login link, a signed-in user their own area. Otherwise
 * "Log in" sent someone who was already logged in back to the login form.
 */
function buildPortalLinks({ isAuthenticated, isAdmin, roles }) {
  if (!isAuthenticated) {
    return [{ label: "Вхід", href: "/login" }];
  }

  // An admin sees only their panel. The client portal link led into a section
  // meant for someone else: portal pages show the data of whoever is signed in,
  // so an admin found their own empty requests and documents there.
  if (isAdmin) {
    return [{ label: "Панель керування", href: getHomeRouteForRoles(roles) }];
  }

  return [
    { label: "Мій кабінет", href: getHomeRouteForRoles(roles) },
    { label: "Документи", href: "/portal/documents" },
    { label: "Мої заявки", href: "/portal/requests" },
  ];
}

export function Navbar1() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isAuthenticated, isAdmin, roles } = useAuth();
  const portalLinks = buildPortalLinks({ isAuthenticated, isAdmin, roles });

  const dropdownRef = useRef(null);

  // On touch screens the menu opens on tap, so there has to be a way to close it.
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
      <section className="sticky top-0 z-50 flex w-full items-center border-b border-brand-border bg-white/95 backdrop-blur-md lg:min-h-[76px]">
        {/* container + px-[5%] is the same grid the page sections use;
            without it the header sprawls across wide screens. */}
        <div className="container px-[5%] lg:flex lg:items-center lg:justify-between">
          <div className="flex min-h-16 items-center justify-between md:min-h-18 lg:min-h-full">
            <Link to="/" className="flex items-center gap-3">
              <img
                  src="/logo-a.svg"
                  alt="Accounting Platform logo"
                  className="h-15 w-auto"
              />
            </Link>

            <button
                className="-mr-2 flex size-12 flex-col items-center justify-center rounded-xl transition-colors hover:bg-brand-pampas lg:hidden"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                  className="my-[3px] h-0.5 w-6 rounded-full bg-brand-ink"
                  animate={{
                    translateY: isMobileMenuOpen ? 8 : 0,
                    rotate: isMobileMenuOpen ? -45 : 0,
                  }}
                  transition={{ duration: 0.25 }}
              />
              <motion.span
                  className="my-[3px] h-0.5 rounded-full bg-brand-ink"
                  animate={{ width: isMobileMenuOpen ? 0 : 24 }}
                  transition={{ duration: 0.2 }}
              />
              <motion.span
                  className="my-[3px] h-0.5 w-6 rounded-full bg-brand-ink"
                  animate={{
                    translateY: isMobileMenuOpen ? -8 : 0,
                    rotate: isMobileMenuOpen ? 45 : 0,
                  }}
                  transition={{ duration: 0.25 }}
              />
            </button>
          </div>

          {/*
            overflow-hidden is only needed for the height animation on mobile.
            At lg it has to go, otherwise it clips the "Portal" dropdown,
            and lg:!h-auto overrides the inline height set by motion.
          */}
          <motion.div
              initial={false}
              animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-white shadow-lg lg:!h-auto lg:flex lg:items-center lg:overflow-visible lg:bg-transparent lg:shadow-none"
          >
            <Link to="/services" className={navLinkClass}>
              Послуги
            </Link>

            <Link to="/blog" className={navLinkClass}>
              Блог
            </Link>

            <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 py-3 text-left text-base font-medium text-brand-muted transition-colors hover:text-brand-madison lg:flex-none lg:justify-start lg:px-4 lg:py-2"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-expanded={isDropdownOpen}
              >
                <span>Портал</span>

                <motion.span
                    className="text-lg"
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                  <RxChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                    <motion.nav
                        key="portal-dropdown"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="mb-4 rounded-card border border-brand-border bg-white p-2 shadow-card lg:absolute lg:left-0 lg:top-full lg:z-50 lg:mb-0 lg:mt-3 lg:min-w-52"
                    >
                      {portalLinks.map((link) => (
                          <Link
                              key={link.href}
                              to={link.href}
                              className={dropdownLinkClass}
                              onClick={() => setIsDropdownOpen(false)}
                          >
                            {link.label}
                          </Link>
                      ))}
                    </motion.nav>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-3 border-t border-brand-border py-5 lg:ml-5 lg:flex-row lg:border-t-0 lg:py-0">
              <Link
                  to="/#contact"
                  className="w-full rounded-button border border-brand-border bg-white px-5 py-2.5 text-center font-semibold text-brand-madison transition-colors hover:border-brand-madison hover:bg-brand-pampas lg:w-auto"
              >
                Контакт
              </Link>

              <Link
                  to="/#contact"
                  className="w-full rounded-button bg-brand-madison px-5 py-2.5 text-center font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark lg:w-auto"
              >
                Консультація
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
  );
}
