export default function PricingPackagesAdminPage() {
    return (
        <section>
            <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Pricing Packages
                </p>

                <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                    Тарифні пакети
                </h1>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Тут буде керування пакетами: створення, редагування,
                    видалення та зміна статусу.
                </p>
            </div>

            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">
                    Pricing packages CRUD буде наступним блоком.
                </p>
            </div>
        </section>
    );
}