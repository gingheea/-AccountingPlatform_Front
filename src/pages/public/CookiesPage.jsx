export default function CookiesPage() {
    return (
        <main className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container max-w-4xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Legal
                </p>

                <h1 className="mb-6 font-heading text-4xl font-bold text-brand-ink md:text-6xl">
                    Політика cookies
                </h1>

                <div className="space-y-8 leading-7 text-brand-muted">
                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            1. Що таке cookies
                        </h2>
                        <p>
                            Cookies — це невеликі файли, які можуть зберігатися у браузері
                            користувача для роботи сайту, запамʼятовування налаштувань або
                            збору статистики.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            2. Які cookies ми можемо використовувати
                        </h2>
                        <p>
                            Сайт може використовувати технічні cookies, необхідні для коректної
                            роботи сторінок, безпеки та базових функцій. Якщо в майбутньому
                            буде підключена аналітика або маркетингові інструменти, ця сторінка
                            буде оновлена.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            3. Аналітичні та маркетингові cookies
                        </h2>
                        <p>
                            Якщо сайт використовуватиме Google Analytics, Meta Pixel або інші
                            подібні інструменти, користувачу буде надано можливість прийняти
                            або відхилити такі cookies через cookie banner, якщо це вимагається
                            законом.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            4. Як керувати cookies
                        </h2>
                        <p>
                            Користувач може обмежити або видалити cookies у налаштуваннях свого
                            браузера. Обмеження технічних cookies може вплинути на роботу
                            окремих функцій сайту.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 font-heading text-2xl font-bold text-brand-ink">
                            5. Контакти
                        </h2>
                        <p>
                            З питань cookies можна звернутися на email: hello@example.com.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}