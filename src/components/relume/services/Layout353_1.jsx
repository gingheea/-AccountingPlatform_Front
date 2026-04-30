"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout353_1() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-flow-row md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div className="static md:sticky md:top-[30%]">
            <p className="mb-3 font-semibold md:mb-4">Переваги</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              Чому вибирають нас для своєї бухгалтерії
            </h2>
            <p className="md:text-md">
              Робимо складне простим. Ваш бізнес заслуговує на надійного
              партнера, який розуміє реальність українського ринку.
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
                Гнучкі тарифи
              </h3>
              <p>
                Платите тільки за те, що потребуєте. Немає прихованих комісій,
                немає довгих контрактів. Можете змінити план у будь-який момент.
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
                Онлайн-супровід
              </h3>
              <p>
                Доступ до портала з будь-якого місця. Завантажуйте документи,
                отримуйте звіти, спілкуйтеся через Telegram або WhatsApp.
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
                Персоналізований підхід
              </h3>
              <p>
                Кожен бізнес унікальний. Розробляємо рішення, які відповідають
                саме вашим цілям та особливостям діяльності.
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
                Швидкі відповіді
              </h3>
              <p>
                Питання виникають раптово. Готові допомогти без затримок, щоб ви
                могли зосередитися на розвитку бізнесу.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
