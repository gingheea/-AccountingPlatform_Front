"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";
import { RxPlus } from "react-icons/rx";

export function Faq4() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg">
        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Питання
          </h2>
          <p className="md:text-md">
            Відповіді на найпоширеніші запитання про облік та податки
          </p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          <AccordionItem
            value="item-0"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={
                <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
              }
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Яка різниця між ФОП та ТОВ?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              ФОП та ТОВ відрізняються рівнем відповідальності, податковим
              навантаженням та складністю ведення обліку. ФОП простіший у
              реєстрації, але несе повну особисту відповідальність. ТОВ вимагає
              більше документації, але обмежує ризики.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-1"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={
                <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
              }
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Як часто потрібно подавати звіти?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Частота подання звітів залежить від системи оподаткування.
              Більшість ФОП подають квартальні та річні звіти. Деякі системи
              вимагають щомісячних розрахунків з ПДВ.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={
                <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
              }
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Які витрати можна відносити на облік?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              До обліку можна відносити витрати, пов'язані з веденням бізнесу.
              Це матеріали, зарплата, комунальні платежі, послуги та обладнання.
              Витрати мають бути документально підтверджені.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={
                <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
              }
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Як розраховується податок на доходи?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              Податок залежить від обраної системи оподаткування. На загальній
              системі він становить 18% від прибутку. На спрощеній системі
              розраховується від доходу або обороту.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            className="border border-border-primary px-5 md:px-6"
          >
            <AccordionTrigger
              icon={
                <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
              }
              className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
            >
              Що робити при перевірці податківців?
            </AccordionTrigger>
            <AccordionContent className="md:pb-6">
              При перевірці важливо мати всі документи в порядку. Не приховуйте
              інформацію та дотримуйтесь вимог перевіряючих. Консультація з
              бухгалтером допоможе захистити ваші права.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Залишилися питання?
          </h4>
          <p className="md:text-md">
            Зв'яжіться зі мною для детальної консультації
          </p>
          <div className="mt-6 md:mt-8">
            <Button title="Контакти" variant="secondary">
              Контакти
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
