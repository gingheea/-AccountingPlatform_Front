export default function RequestsAdminPage() {
    return (
        <section>
            <div className="mb-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Requests
                </p>

                <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                    Заявки клієнтів
                </h1>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Тут буде список заявок, статуси, контактні дані та нотатки
                    адміністратора.
                </p>
            </div>

            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">
                    Client requests management буде наступним окремим блоком.
                </p>
            </div>
        </section>
    );
}