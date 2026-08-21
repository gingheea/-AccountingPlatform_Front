"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getMySubscriptions } from "../../services/subscriptionsService";
import { getApiErrorMessage } from "../../utils/apiError";
import { SUBSCRIPTION_STATUS } from "../../constants/subscriptions";
import SubscriptionCard from "../../components/portal/SubscriptionCard";

export default function PortalServicesPage() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                setIsLoading(true);
                setSubscriptions((await getMySubscriptions()).items);
            } catch (error) {
                console.error("Failed to load subscriptions:", error);
                toast.error(getApiErrorMessage(error, "Не вдалося завантажити ваші послуги."));
            } finally {
                setIsLoading(false);
            }
        }

        load();
    }, []);

    // Активне й на паузі — зверху, завершене — окремим блоком нижче.
    const { current, past } = useMemo(() => {
        return {
            current: subscriptions.filter((s) => s.status !== SUBSCRIPTION_STATUS.Ended),
            past: subscriptions.filter((s) => s.status === SUBSCRIPTION_STATUS.Ended),
        };
    }, [subscriptions]);

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Services
                </p>

                <h2 className="font-heading text-4xl font-bold text-brand-ink">
                    Мої послуги
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Пакети та послуги, за якими бухгалтер веде вас зараз, і ті, що вже
                    завершені.
                </p>
            </section>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження...</p>
                </div>
            ) : subscriptions.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Поки що нічого не підключено
                    </h3>

                    <p className="mx-auto mt-2 max-w-lg text-brand-muted">
                        Коли бухгалтер візьме вас на супровід, тут зʼявиться ваш пакет із
                        датою початку. Щоб обрати формат — залиште заявку.
                    </p>

                    <Link
                        to="/portal/requests"
                        className="mt-5 inline-flex rounded-button bg-brand-madison px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-madisonDark"
                    >
                        Мої заявки
                    </Link>
                </div>
            ) : (
                <>
                    {current.length > 0 && (
                        <section className="grid gap-5 md:grid-cols-2">
                            {current.map((subscription) => (
                                <SubscriptionCard key={subscription.id} subscription={subscription} />
                            ))}
                        </section>
                    )}

                    {past.length > 0 && (
                        <section>
                            <h3 className="mb-4 font-heading text-xl font-bold text-brand-ink">
                                Завершені
                            </h3>

                            <div className="grid gap-5 md:grid-cols-2">
                                {past.map((subscription) => (
                                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
