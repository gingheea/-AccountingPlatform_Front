export default function TermsPage() {
    return (
        <main className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container max-w-4xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Legal
                </p>

                <h1 className="mb-6 font-heading text-4xl font-bold text-brand-ink md:text-6xl">
                    Умови використання
                </h1>

                <div className="space-y-8 leading-7 text-brand-muted">
                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            1. Призначення сайту
                        </h2>
                        <p>
                            Сайт Accounting Platform надає інформацію про бухгалтерські послуги,
                            консультації, супровід бізнесу та можливі формати співпраці.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            2. Інформаційний характер матеріалів
                        </h2>
                        <p>
                            Матеріали сайту мають загальний інформаційний характер і не є
                            індивідуальною бухгалтерською, податковою або юридичною
                            консультацією. Для конкретного рішення необхідно аналізувати вашу
                            ситуацію окремо.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            3. Заявки та консультації
                        </h2>
                        <p>
                            Надсилання заявки через сайт не означає автоматичного укладення
                            договору. Умови співпраці, обсяг послуг, строки та вартість
                            погоджуються окремо.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            4. Відповідальність користувача
                        </h2>
                        <p>
                            Користувач відповідає за достовірність інформації, яку надає через
                            сайт або під час консультації.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            5. Зміни на сайті
                        </h2>
                        <p>
                            Ми можемо оновлювати зміст сайту, опис послуг, тарифи та ці умови
                            без попереднього повідомлення.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            6. Контакти
                        </h2>
                        <p>
                            З питань використання сайту можна звернутися на email:
                            hello@example.com.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}