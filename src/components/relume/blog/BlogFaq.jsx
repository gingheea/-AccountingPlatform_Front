"use client";

import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";

export function BlogFaq() {
  return (
      <section id="FAQ" className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container max-w-4xl">
          <div className="rb-12 mx-auto mb-12 max-w-3xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              FAQ
            </p>

            <h2 className="rb-5 mb-5 font-heading text-4xl font-bold leading-tight text-brand-ink md:mb-6 md:text-6xl lg:text-7xl">
              Часті питання
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Відповіді на найпоширеніші запитання про облік, податки, звітність
              та роботу з бухгалтером.
            </p>
          </div>

          <Accordion
              type="multiple"
              className="grid items-start justify-stretch gap-4"
          >
            <AccordionItem
                value="item-0"
                className="rounded-card border border-brand-border bg-brand-pampas px-5 shadow-soft md:px-6"
            >
              <AccordionTrigger
                  icon={
                    <RxPlus className="size-7 shrink-0 text-brand-madison transition-transform duration-300 md:size-8" />
                  }
                  className="font-heading font-semibold text-brand-ink md:py-5 md:text-xl [&[data-state=open]>svg]:rotate-45"
              >
                Яка різниця між ФОП та ТОВ?
              </AccordionTrigger>

              <AccordionContent className="leading-7 text-brand-muted md:pb-6">
                ФОП зазвичай простіший у реєстрації та веденні обліку, але має
                інший рівень відповідальності й податкових правил. ТОВ потребує
                більше документації та формального обліку, але краще підходить для
                масштабнішої діяльності, партнерств або найманої команди.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
                value="item-1"
                className="rounded-card border border-brand-border bg-white px-5 shadow-soft md:px-6"
            >
              <AccordionTrigger
                  icon={
                    <RxPlus className="size-7 shrink-0 text-brand-madison transition-transform duration-300 md:size-8" />
                  }
                  className="font-heading font-semibold text-brand-ink md:py-5 md:text-xl [&[data-state=open]>svg]:rotate-45"
              >
                Як часто потрібно подавати звіти?
              </AccordionTrigger>

              <AccordionContent className="leading-7 text-brand-muted md:pb-6">
                Частота подання звітів залежить від форми діяльності, системи
                оподаткування, наявності працівників і ПДВ. Для частини
                підприємців це квартальні або річні звіти, для інших — регулярні
                щомісячні чи додаткові подання.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
                value="item-2"
                className="rounded-card border border-brand-border bg-white px-5 shadow-soft md:px-6"
            >
              <AccordionTrigger
                  icon={
                    <RxPlus className="size-7 shrink-0 text-brand-madison transition-transform duration-300 md:size-8" />
                  }
                  className="font-heading font-semibold text-brand-ink md:py-5 md:text-xl [&[data-state=open]>svg]:rotate-45"
              >
                Які витрати можна враховувати в обліку?
              </AccordionTrigger>

              <AccordionContent className="leading-7 text-brand-muted md:pb-6">
                Зазвичай враховуються витрати, повʼязані з господарською
                діяльністю: послуги, матеріали, обладнання, оренда, програмне
                забезпечення, зарплата або інші підтверджені витрати. Важливо, щоб
                вони були документально обґрунтовані.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
                value="item-3"
                className="rounded-card border border-brand-border bg-white px-5 shadow-soft md:px-6"
            >
              <AccordionTrigger
                  icon={
                    <RxPlus className="size-7 shrink-0 text-brand-madison transition-transform duration-300 md:size-8" />
                  }
                  className="font-heading font-semibold text-brand-ink md:py-5 md:text-xl [&[data-state=open]>svg]:rotate-45"
              >
                Як розраховується податок на доходи?
              </AccordionTrigger>

              <AccordionContent className="leading-7 text-brand-muted md:pb-6">
                Розрахунок залежить від системи оподаткування. У деяких випадках
                податок залежить від доходу, в інших — від прибутку або окремих
                правил для конкретної форми діяльності. Точний розрахунок краще
                робити після аналізу вашої ситуації.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
                value="item-4"
                className="rounded-card border border-brand-border bg-brand-madison px-5 text-white shadow-card md:px-6"
            >
              <AccordionTrigger
                  icon={
                    <RxPlus className="size-7 shrink-0 text-brand-tan transition-transform duration-300 md:size-8" />
                  }
                  className="font-heading font-semibold text-white md:py-5 md:text-xl [&[data-state=open]>svg]:rotate-45"
              >
                Що робити при перевірці податківців?
              </AccordionTrigger>

              <AccordionContent className="leading-7 text-white/75 md:pb-6">
                Насамперед потрібно зібрати документи, перевірити строки,
                підстави перевірки та не діяти хаотично. Бухгалтерський супровід
                допомагає підготувати документи, зрозуміти вимоги та мінімізувати
                ризики.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mx-auto mt-12 max-w-2xl rounded-card border border-brand-border bg-brand-pampas p-8 text-center shadow-soft md:mt-18 lg:mt-20">
            <h4 className="mb-3 font-heading text-3xl font-bold leading-tight text-brand-ink md:mb-4 md:text-4xl">
              Залишилися питання?
            </h4>

            <p className="mx-auto max-w-md leading-7 text-brand-muted md:text-md">
              Звʼяжіться зі мною для детальної консультації щодо вашої ситуації.
            </p>

            <div className="mt-8">
              <Link
                  to="/#contact"
                  title="Контакти"
                  className="rounded-button border border-brand-madison bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
              >
                Контакти
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
}