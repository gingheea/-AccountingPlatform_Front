"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout353() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <p className="mb-3 font-semibold md:mb-4">Послуги</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Повний спектр бухгалтерських рішень
            </h2>
            <p className="md:text-md">
              Кожна послуга розроблена для вашого бізнесу. Від ведення обліку до
              податкового планування, ми забезпечуємо точність та спокій.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <Button title="Портал" variant="secondary">
                Портал
              </Button>
              <Button
                title="Завантажити"
                variant="link"
                size="link"
                iconRight={<RxChevronRight />}
              >
                Завантажити
              </Button>
            </div>
          </div>
          <div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "30%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Облік ФОП
              </h3>
              <p>
                Ведення повної бухгалтерії для фізичних осіб-підприємців.
                Організуємо документацію, розраховуємо податки та готуємо звіти.
              </p>
            </div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "32%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Облік ТОВ
              </h3>
              <p>
                Комплексне бухгалтерське обслуговування для товариств з
                обмеженою відповідальністю. Забезпечуємо своєчасність та
                відповідність законодавству.
              </p>
            </div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "34%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Податкове планування
              </h3>
              <p>
                Розробляємо стратегії для оптимізації податкового навантаження.
                Легально та ефективно зменшуємо видатки на податки.
              </p>
            </div>
            <div
              className="sticky mb-8 border border-border-primary bg-background-primary p-8"
              style={{ top: "36%" }}
            >
              <div className="mb-3 md:mb-4">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                  alt="Relume logo 1"
                  className="size-12"
                />
              </div>
              <h3 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                Звітність та подання
              </h3>
              <p>
                Підготовка та своєчасна подача всіх необхідних звітів. Уникаємо
                штрафів та забезпечуємо прозорість перед контролюючими органами.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
