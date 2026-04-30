"use client";

import React from "react";
import { BiCheck, BiX } from "react-icons/bi";

export function Comparison13() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="mb-3 font-semibold md:mb-4">Навігація</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Посилання та інформація
          </h2>
          <p className="md:text-md">Знайдіть все, що вам потрібно на сайті</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
            <div>
              <div className="rb-4 mb-3 flex flex-col items-start justify-end md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume icon 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Основні сторінки
              </h3>
              <p className="mb-5 md:mb-6">Головна, Про мене, Послуги, Блог</p>
              <div className="grid grid-cols-1">
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Облік ФОП та ТОВ</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    Від 1500 грн
                  </h6>
                </div>
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Податкове планування</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    Індивідуально
                  </h6>
                </div>
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Звітність та подання</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    Включено в план
                  </h6>
                </div>
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Консультації онлайн</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    500 грн/год
                  </h6>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-4 py-2 md:mt-8">
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Портал для клієнтів</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Безпечний обмін документами</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiX className="size-6" />
                  </div>
                  <p>Інтеграція з Telegram та WhatsApp</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiX className="size-6" />
                  </div>
                  <p>Онлайн-платежі та розрахунки</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
            <div>
              <div className="rb-4 mb-3 flex flex-col items-start justify-end md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume icon 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Додаткові послуги
              </h3>
              <p className="mb-5 md:mb-6">Аудит та перевірки документів</p>
              <div className="grid grid-cols-1">
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Облік ФОП та ТОВ</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    Від 1500 грн
                  </h6>
                </div>
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Податкове планування</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    Індивідуально
                  </h6>
                </div>
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Звітність та подання</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    Включено в план
                  </h6>
                </div>
                <div className="flex justify-between gap-4 border-b border-border-primary py-6 first:border-t">
                  <p>Консультації онлайн</p>
                  <h6 className="text-md font-bold leading-[1.4] md:text-lg md:leading-[1.4]">
                    500 грн/год
                  </h6>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-4 py-2 md:mt-8">
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Портал для клієнтів</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Безпечний обмін документами</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Інтеграція з месенджерами</p>
                </div>
                <div className="flex self-start">
                  <div className="mr-4 flex-none self-start">
                    <BiCheck className="size-6" />
                  </div>
                  <p>Онлайн-платежі та розрахунки</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
