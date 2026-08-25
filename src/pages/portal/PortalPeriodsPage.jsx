"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCheck } from "react-icons/rx";
import {
    getMyReportingPeriod,
    getMyReportingPeriods,
} from "../../services/reportingPeriodsService";
import { getApiErrorMessage } from "../../utils/apiError";
import {
    PERIOD_STATUS,
    daysUntil,
    formatDueDate,
    periodStatusClass,
    periodStatusLabel,
    periodTitle,
} from "../../constants/periods";
import ProgressBar from "../../components/ui/ProgressBar";
import Pagination from "../../components/ui/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../services/paging";

export default function PortalPeriodsPage() {
    const [periods, setPeriods] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(true);

    // Which period's checklist is expanded, and its loaded detail.
    const [openId, setOpenId] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        let isActive = true;

        getMyReportingPeriods({ page, pageSize })
            .then((result) => {
                if (!isActive) return;

                setPeriods(result.items);
                setTotal(result.total);
            })
            .catch((error) => {
                if (!isActive) return;

                console.error("Failed to load periods:", error);
                toast.error(getApiErrorMessage(error, "Не вдалося завантажити періоди."));
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, [page, pageSize]);

    /**
     * The checklist is fetched only when a card is expanded. Loading every
     * period's steps up front would mean a request per row for something most
     * clients never open.
     */
    const toggle = async (period) => {
        if (openId === period.id) {
            setOpenId(null);
            setDetails(null);
            return;
        }

        setOpenId(period.id);
        setDetails(null);

        try {
            setDetails(await getMyReportingPeriod(period.id));
        } catch (error) {
            console.error("Failed to load period:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося завантажити кроки."));
            setOpenId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="text-brand-muted">Завантаження...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                    Periods
                </p>

                <h2 className="font-heading text-4xl font-bold text-brand-ink">
                    Звітні періоди
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                    Як просувається робота за кожен місяць або квартал. Натисніть на
                    період, щоб побачити конкретні кроки.
                </p>
            </section>

            {periods.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Періодів ще немає
                    </h3>

                    <p className="mt-3 leading-7 text-brand-muted">
                        Щойно бухгалтер розпочне роботу за перший період, він з’явиться тут.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-4">
                        {periods.map((period) => {
                            const left = daysUntil(period.dueDate);
                            const isOpen = openId === period.id;
                            const isDone = period.progressPercent === 100;

                            return (
                                <section
                                    key={period.id}
                                    className="rounded-card border border-brand-border bg-white p-6 shadow-soft"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggle(period)}
                                        aria-expanded={isOpen}
                                        className="w-full text-left"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="font-heading text-2xl font-bold text-brand-ink">
                                                    {periodTitle(period)}
                                                </h3>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${periodStatusClass(
                                                        period.status
                                                    )}`}
                                                >
                                                    {periodStatusLabel(period.status)}
                                                </span>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-sm text-brand-muted">
                                                    Подати до {formatDueDate(period.dueDate)}
                                                </p>

                                                {period.status !== PERIOD_STATUS.Closed &&
                                                    left !== null &&
                                                    left <= 7 && (
                                                        <p
                                                            className={`mt-1 text-xs font-semibold ${
                                                                left < 0 ? "text-red-700" : "text-yellow-700"
                                                            }`}
                                                        >
                                                            {left < 0
                                                                ? `Прострочено на ${Math.abs(left)} дн.`
                                                                : left === 0
                                                                    ? "Сьогодні"
                                                                    : `Лишилось ${left} дн.`}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <ProgressBar
                                                percent={period.progressPercent}
                                                label={`Виконано ${period.doneCount} з ${period.taskCount}`}
                                                tone={isDone ? "done" : "default"}
                                            />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="mt-5 border-t border-brand-border pt-5">
                                            {!details ? (
                                                <p className="text-sm text-brand-muted">
                                                    Завантаження кроків...
                                                </p>
                                            ) : (
                                                <ul className="grid gap-2">
                                                    {details.tasks.map((task) => (
                                                        <li
                                                            key={task.id}
                                                            className="flex items-center gap-3 text-sm"
                                                        >
                                                            {/* Read-only on purpose: steps are the
                                                                accountant's work, the client watches. */}
                                                            <span
                                                                className={`flex size-6 shrink-0 items-center justify-center rounded-md border ${
                                                                    task.isDone
                                                                        ? "border-green-600 bg-green-600 text-white"
                                                                        : "border-brand-border bg-white text-transparent"
                                                                }`}
                                                            >
                                                                <RxCheck className="size-3.5" />
                                                            </span>

                                                            <span
                                                                className={
                                                                    task.isDone
                                                                        ? "text-brand-gothic line-through"
                                                                        : "text-brand-ink"
                                                                }
                                                            >
                                                                {task.title}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                    </div>

                    <Pagination
                        page={page}
                        pageSize={pageSize}
                        total={total}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => {
                            setPage(1);
                            setPageSize(size);
                        }}
                    />
                </>
            )}
        </div>
    );
}
