"use client";

import {
    SUBSCRIPTION_STATUS,
    formatSubscriptionDate,
    subscriptionKind,
    subscriptionStatusClass,
    subscriptionStatusLabel,
    subscriptionTitle,
} from "../../constants/subscriptions";

export default function SubscriptionCard({ subscription }) {
    const isEnded = subscription.status === SUBSCRIPTION_STATUS.Ended;

    return (
        <div
            className={`rounded-card border border-brand-border bg-white p-6 shadow-soft ${
                isEnded ? "opacity-70" : ""
            }`}
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-brand-muted">
                        {subscriptionKind(subscription)}
                    </p>

                    <h3 className="mt-1 font-heading text-2xl font-bold text-brand-ink">
                        {subscriptionTitle(subscription)}
                    </h3>
                </div>

                <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${subscriptionStatusClass(
                        subscription.status,
                    )}`}
                >
                    {subscriptionStatusLabel(subscription.status)}
                </span>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-brand-muted">Початок</dt>
                    <dd className="mt-1 font-semibold text-brand-ink">
                        {formatSubscriptionDate(subscription.startedAtUtc)}
                    </dd>
                </div>

                {subscription.endedAtUtc && (
                    <div>
                        <dt className="text-sm text-brand-muted">Завершення</dt>
                        <dd className="mt-1 font-semibold text-brand-ink">
                            {formatSubscriptionDate(subscription.endedAtUtc)}
                        </dd>
                    </div>
                )}
            </dl>

            {subscription.note && (
                <p className="mt-4 rounded-button bg-brand-pampas px-4 py-3 text-sm leading-6 text-brand-muted">
                    {subscription.note}
                </p>
            )}
        </div>
    );
}
