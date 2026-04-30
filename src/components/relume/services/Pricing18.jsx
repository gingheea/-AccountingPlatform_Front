"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { BiCheck } from "react-icons/bi";

export function Pricing18() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Ціни</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Прозорі тарифи
          </h2>
          <p className="md:text-md">
            Вибирайте план, який відповідає вашим потребам
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
            <div>
              <div className="rb-6 mb-6 text-center md:mb-8">
                <h6 className="text-md font-bold md:text-xl">Для ФОП</h6>
                <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                  1500
                </h1>
                <p>грн на місяць</p>
              </div>
              <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Облік доходів та видатків</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Розрахунок податків щомісяця</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Консультація один раз на місяць</p>
                </div>
              </div>
            </div>
            <div>
              <Button title="Обрати" className="w-full">
                Обрати
              </Button>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
            <div>
              <div className="rb-6 mb-6 text-center md:mb-8">
                <h6 className="text-md font-bold md:text-xl">Для ТОВ</h6>
                <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                  3500
                </h1>
                <p>грн на місяць</p>
              </div>
              <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Повна бухгалтерія та звітність</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Податкове планування та оптимізація</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Консультації без обмежень</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Підготовка до перевірок</p>
                </div>
              </div>
            </div>
            <div>
              <Button title="Обрати" className="w-full">
                Обрати
              </Button>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
            <div>
              <div className="rb-6 mb-6 text-center md:mb-8">
                <h6 className="text-md font-bold md:text-xl">Консультації</h6>
                <h1 className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                  500
                </h1>
                <p>грн за годину</p>
              </div>
              <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Індивідуальне обговорення питань</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Розробка стратегії розвитку</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Аналіз поточної ситуації</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Рекомендації та пропозиції</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Записатися</p>
                </div>
              </div>
            </div>
            <div>
              <Button title="Get started" className="w-full">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
