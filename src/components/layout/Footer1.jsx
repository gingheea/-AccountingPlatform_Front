"use client";

import { Link } from "react-router-dom";
import { Button, Input } from "@relume_io/relume-ui";
import React, { useState } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { activeSocialLinks } from "../../constants/site";

const SOCIAL_META = {
  facebook: { Icon: BiLogoFacebookCircle, label: "Facebook" },
  instagram: { Icon: BiLogoInstagram, label: "Instagram" },
  x: { Icon: FaXTwitter, label: "X" },
  linkedin: { Icon: BiLogoLinkedinSquare, label: "LinkedIn" },
  telegram: { Icon: BiLogoYoutube, label: "Telegram" },
};

const useForm = () => {
  const [email, setEmail] = useState("");

  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email });
  };

  return {
    email,
    handleSetEmail,
    handleSubmit,
  };
};

export function Footer1() {
  // Показуємо лише ті соцмережі, які реально заповнені в constants/site.js.
  const socialLinks = activeSocialLinks();

  const formState = useForm();

  const footerLinkClass =
      "flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white";

  const footerHeadingClass =
      "mb-4 font-heading text-base font-bold text-white md:mb-5";

  const legalLinkClass =
      "text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline";

  return (
      <footer className="bg-[#242A30] px-[5%] py-12 text-white md:py-18 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.8fr_1fr] lg:gap-y-4 lg:pb-20">
            <div className="flex flex-col">
              <Link to="/" className="mb-6 flex items-center gap-3">
                <img
                    src="/logo-c.svg"
                    alt="Accounting Platform logo"
                    className="h-17 w-auto"
                />
              </Link>

              <p className="mb-6 max-w-md leading-7 text-white/70">
                Отримуйте корисні оновлення про облік, податки, документи та
                практичні рішення для підприємців.
              </p>

              <div className="w-full max-w-md rounded-card border border-white/10 bg-white/5 p-4">
                <form
                    className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
                    onSubmit={formState.handleSubmit}
                >
                  <Input
                      id="email"
                      type="email"
                      placeholder="Ваша пошта"
                      value={formState.email}
                      onChange={formState.handleSetEmail}
                      className="min-h-12 rounded-button border-white/10 bg-white px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-tan focus:ring-brand-tan"
                  />

                  <Button
                      title="Підписатися"
                      variant="secondary"
                      size="sm"
                      className="min-h-12 rounded-button bg-brand-tan px-5 py-3 font-semibold text-brand-ink transition-colors hover:bg-white"
                  >
                    Підписатися
                  </Button>
                </form>

                <p className="text-xs leading-5 text-white/50">
                  Підписуючись, ви погоджуєтесь із політикою конфіденційності та
                  даєте згоду на отримання оновлень.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
              <div className="flex flex-col items-start justify-start">
                <h2 className={footerHeadingClass}>Послуги</h2>

                <ul>
                  <li className="py-2">
                    <Link to="/services" className={footerLinkClass}>
                      <span>Послуги ФОП</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/services" className={footerLinkClass}>
                      <span>Послуги для бізнесу</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/#quick-consultation" className={footerLinkClass}>
                      <span>Консультації</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/portal" className={footerLinkClass}>
                      <span>Портал клієнта</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/services#pricing" className={footerLinkClass}>
                      <span>Прайс-лист</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col items-start justify-start">
                <h2 className={footerHeadingClass}>Навігація</h2>

                <ul>
                  <li className="py-2">
                    <Link to="/about" className={footerLinkClass}>
                      <span>Про мене</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/blog" className={footerLinkClass}>
                      <span>Блог</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/#contact" className={footerLinkClass}>
                      <span>Контакти</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/portal" className={footerLinkClass}>
                      <span>Портал клієнта</span>
                    </Link>
                  </li>

                  <li className="py-2">
                    <Link to="/blog#FAQ" className={footerLinkClass}>
                      <span>FAQ</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {socialLinks.length > 0 && (
                  <div className="flex flex-col items-start justify-start">
                    <h2 className={footerHeadingClass}>Соцмережі</h2>

                    <ul className="flex flex-col items-start">
                      {socialLinks.map(({ key, url }) => {
                        const { Icon, label } = SOCIAL_META[key];

                        return (
                            <li key={key} className="py-2">
                              <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={footerLinkClass}
                              >
                                <Icon className="size-6 text-white/50" />
                                <span>{label}</span>
                              </a>
                            </li>
                        );
                      })}
                    </ul>
                  </div>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="flex flex-col-reverse items-start justify-between gap-6 pb-4 pt-6 md:flex-row md:items-center md:pb-0 md:pt-8">
            <p className="text-sm text-white/50">
              © 2026 Stelmakh Accounting. Усі права захищені.
            </p>

            <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 md:grid-flow-col md:gap-x-6 md:gap-y-0">
              <li>
                <Link to="/privacy" className={legalLinkClass}>
                  Політика конфіденційності
                </Link>
              </li>

              <li>
                <Link to="/terms" className={legalLinkClass}>
                  Умови використання
                </Link>
              </li>

              <li>
                <Link to="/cookies" className={legalLinkClass}>
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  );
}