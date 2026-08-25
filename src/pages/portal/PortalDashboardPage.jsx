"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { RxArrowRight, RxCheckCircled } from "react-icons/rx";
import { getMyClientRequests, getPortalMe } from "../../services/portalService";
import { getMyDocuments } from "../../services/documentsService";
import { getMySubscriptions } from "../../services/subscriptionsService";
import { getMyReportingPeriods } from "../../services/reportingPeriodsService";
import { MAX_PAGE_SIZE } from "../../services/paging";
import { SUBSCRIPTION_STATUS, subscriptionTitle } from "../../constants/subscriptions";
import { isActiveRequest } from "../../constants/requests";
import {
    PERIOD_STATUS,
    daysUntil,
    formatDueDate,
    periodTitle,
} from "../../constants/periods";
import ProgressBar from "../../components/ui/ProgressBar";

/** Document category ids from the backend enum, grouped the way the client thinks. */
const CATEGORY_REPORTING = 0;
const CATEGORY_INVOICE = 1;
const CATEGORY_ACT = 2;

/** Document statuses: 2 = accepted, 4 = archived. Both count as "dealt with". */
const STATUS_ACCEPTED = 2;
const STATUS_ARCHIVED = 4;

const DIRECTION_FROM_CLIENT = 0;

export default function PortalDashboardPage() {
    const [me, setMe] = useState(null);
    const [requests, setRequests] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function load() {
            try {
                const [meData, requestsData, documentsData, subscriptionsData, periodsData] =
                    await Promise.all([
                        getPortalMe(),
                        getMyClientRequests({ pageSize: MAX_PAGE_SIZE }),
                        getMyDocuments({ pageSize: MAX_PAGE_SIZE }),
                        getMySubscriptions({ pageSize: MAX_PAGE_SIZE }),
                        getMyReportingPeriods({ pageSize: MAX_PAGE_SIZE }),
                    ]);

                if (!isActive) return;

                setMe(meData);
                setRequests(requestsData.items);
                setDocuments(documentsData.items);
                setSubscriptions(subscriptionsData.items);
                setPeriods(periodsData.items);
            } catch (error) {
                if (!isActive) return;

                console.error("Failed to load portal dashboard:", error);
                toast.error("Не вдалося завантажити портал.");
            } finally {
                if (isActive) setIsLoading(false);
            }
        }

        load();

        return () => {
            isActive = false;
        };
    }, []);

    const activeSubscriptions = useMemo(
        () => subscriptions.filter((s) => s.status === SUBSCRIPTION_STATUS.Active),
        [subscriptions]
    );

    /** The period being worked on right now — the one with the nearest deadline. */
    const currentPeriod = useMemo(() => {
        const open = periods.filter((p) => p.status === PERIOD_STATUS.Open);

        return [...open].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0] ?? null;
    }, [periods]);

    const overduePeriods = useMemo(
        () =>
            periods.filter(
                (p) => p.status === PERIOD_STATUS.Open && (daysUntil(p.dueDate) ?? 0) < 0
            ),
        [periods]
    );

    /**
     * "Documents 82%" on the landing mockup needed a definition someone can say
     * out loud, otherwise it is a number nobody can defend. This one is:
     * how much of what the client sent has already been dealt with by the
     * accountant — accepted or archived, out of everything they uploaded.
     */
    const documentProgress = useMemo(() => {
        const mine = documents.filter((d) => d.direction === DIRECTION_FROM_CLIENT);

        if (mine.length === 0) return { percent: 0, done: 0, total: 0 };

        const done = mine.filter(
            (d) => d.status === STATUS_ACCEPTED || d.status === STATUS_ARCHIVED
        ).length;

        return {
            percent: Math.round((done * 100) / mine.length),
            done,
            total: mine.length,
        };
    }, [documents]);

    const countByCategory = (category) =>
        documents.filter((d) => d.category === category).length;

    const activeRequestsCount = useMemo(
        () => requests.filter((r) => isActiveRequest(r.status)).length,
        [requests]
    );

    /**
     * One concrete thing to do next, picked in order of what actually blocks the
     * client. A dashboard that shows five equal options tells you nothing.
     */
    const nextStep = useMemo(() => {
        if (activeSubscriptions.length === 0) {
            return {
                title: "Обрати пакет супроводу",
                text: "Поки що жодне обслуговування не підключено. Залиште заявку — і ми підберемо формат під ваш бізнес.",
                action: "Залишити заявку",
                to: "/portal/requests",
            };
        }

        if (overduePeriods.length > 0) {
            return {
                title: "Є прострочений період",
                text: `${periodTitle(overduePeriods[0])} — строк подання минув. Бухгалтер уже в курсі, але варто звірити документи.`,
                action: "Переглянути періоди",
                to: "/portal/periods",
            };
        }

        if (documentProgress.total > documentProgress.done) {
            return {
                title: "Документи на перевірці",
                text: `${documentProgress.total - documentProgress.done} з ваших документів ще опрацьовуються.`,
                action: "Переглянути документи",
                to: "/portal/documents",
            };
        }

        return {
            title: "Усе під контролем",
            text: "Активних завдань з вашого боку немає. Якщо виникне питання — надішліть заявку.",
            action: "Нова заявка",
            to: "/portal/requests",
        };
    }, [activeSubscriptions, overduePeriods, documentProgress]);

    const isAllGood = overduePeriods.length === 0 && activeSubscriptions.length > 0;

    if (isLoading) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">Завантаження порталу...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Статус обліку — те, що на лендінгу показано як «Все під контролем» */}
            <section className="rounded-card border border-white/15 bg-brand-madison p-8 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-tan">
                            Статус обліку
                        </p>

                        <h2 className="font-heading text-4xl font-bold text-white">
                            {isAllGood ? "Все під контролем" : "Потрібна увага"}
                        </h2>

                        <p className="mt-3 max-w-xl leading-7 text-white/70">
                            {me?.fullName ? `${me.fullName}, ` : ""}
                            {activeSubscriptions.length > 0
                                ? `ваш формат супроводу — ${subscriptionTitle(activeSubscriptions[0])}.`
                                : "обслуговування ще не підключено."}
                        </p>
                    </div>

                    <span
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                            isAllGood
                                ? "bg-white/10 text-brand-tan"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {isAllGood ? "Active" : "Attention"}
                    </span>
                </div>
            </section>

            {/* Панель документів + місячний огляд */}
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <section className="rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Client portal
                    </p>

                    <h3 className="mb-6 font-heading text-2xl font-bold text-brand-ink">
                        Панель документів
                    </h3>

                    <div className="grid gap-3">
                        <DocumentRow
                            title="Податкова звітність"
                            subtitle={`${countByCategory(CATEGORY_REPORTING)} документів`}
                            state={
                                currentPeriod?.progressPercent === 100 || !currentPeriod
                                    ? "Готово"
                                    : "У роботі"
                            }
                            to="/portal/documents"
                        />

                        <DocumentRow
                            title="Рахунки та акти"
                            subtitle={`${
                                countByCategory(CATEGORY_INVOICE) + countByCategory(CATEGORY_ACT)
                            } документів`}
                            state={
                                documentProgress.total === documentProgress.done
                                    ? "Перевірено"
                                    : "На перевірці"
                            }
                            to="/portal/documents"
                        />

                        <DocumentRow
                            title="Заявки"
                            subtitle={
                                activeRequestsCount > 0
                                    ? `${activeRequestsCount} в роботі`
                                    : "Активних немає"
                            }
                            state={activeRequestsCount > 0 ? "У роботі" : "Створити"}
                            to="/portal/requests"
                            accent={activeRequestsCount === 0}
                        />
                    </div>
                </section>

                <section className="rounded-card border border-brand-border bg-white p-6 shadow-soft md:p-8">
                    <p className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Monthly overview
                    </p>

                    <div className="grid gap-5">
                        <ProgressBar
                            percent={documentProgress.percent}
                            label={`Документи · ${documentProgress.done} з ${documentProgress.total}`}
                            tone={
                                documentProgress.total > 0 &&
                                documentProgress.done === documentProgress.total
                                    ? "done"
                                    : "default"
                            }
                        />

                        <ProgressBar
                            percent={currentPeriod?.progressPercent ?? 0}
                            label={
                                currentPeriod
                                    ? `Звітність · ${periodTitle(currentPeriod)}`
                                    : "Звітність · періодів немає"
                            }
                            tone={currentPeriod?.progressPercent === 100 ? "done" : "default"}
                        />
                    </div>

                    {currentPeriod && (
                        <p className="mt-5 border-t border-brand-border pt-4 text-sm text-brand-muted">
                            Подати до {formatDueDate(currentPeriod.dueDate)}
                        </p>
                    )}
                </section>
            </div>

            {/* Наступний крок */}
            <section className="rounded-card border border-brand-border bg-brand-pampas p-6 shadow-soft md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-madison">
                            <RxCheckCircled className="size-5" />
                        </span>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                                Наступний крок
                            </p>

                            <h3 className="mt-1 font-heading text-2xl font-bold text-brand-ink">
                                {nextStep.title}
                            </h3>

                            <p className="mt-2 max-w-xl leading-7 text-brand-muted">
                                {nextStep.text}
                            </p>
                        </div>
                    </div>

                    <Link
                        to={nextStep.to}
                        className="inline-flex items-center gap-2 rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                    >
                        {nextStep.action}
                        <RxArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

/** One row of the document panel, matching the landing-page mockup. */
function DocumentRow({ title, subtitle, state, to, accent = false }) {
    return (
        <Link
            to={to}
            className="flex items-center justify-between gap-4 rounded-card bg-brand-pampas px-5 py-4 transition-colors hover:bg-brand-soft"
        >
            <div>
                <p className="font-semibold text-brand-ink">{title}</p>
                <p className="mt-0.5 text-sm text-brand-muted">{subtitle}</p>
            </div>

            <span
                className={`shrink-0 text-sm font-semibold ${
                    accent ? "text-brand-tan" : "text-brand-madison"
                }`}
            >
                {state}
            </span>
        </Link>
    );
}
