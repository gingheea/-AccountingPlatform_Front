export default function DashboardPage() {
    return (
        <section>
            <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Dashboard
                </p>

                <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                    Огляд адмін-панелі
                </h1>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Тут буде коротка статистика по заявках, послугах, тарифах та
                    активності клієнтів.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Client Requests
                    </p>
                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        —
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Services
                    </p>
                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        —
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">
                        Packages
                    </p>
                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        —
                    </p>
                </div>
            </div>
        </section>
    );
}