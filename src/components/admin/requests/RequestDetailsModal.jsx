"use client";

import SelectField from "../../ui/SelectField";
import { useEffect, useState } from "react";
import { Button } from "@relume_io/relume-ui";
import { RxCross2 } from "react-icons/rx";
import RequestStatusBadge from "./RequestStatusBadge";
import RequestTypeBadge from "./RequestTypeBadge";

const STATUS_OPTIONS = [
    { value: 0, label: "New" },
    { value: 1, label: "In progress" },
    { value: 2, label: "Waiting for client" },
    { value: 3, label: "Completed" },
    { value: 4, label: "Rejected" },
];

function normalizeStatus(status) {
    if (typeof status === "number") return status;

    const map = {
        New: 0,
        InProgress: 1,
        WaitingForClient: 2,
        Completed: 3,
        Rejected: 4,
    };

    return map[status] ?? 0;
}

function formatDate(date) {
    if (!date) return "—";

    return new Intl.DateTimeFormat("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

function getSelectedOption(request, servicesMap, packagesMap) {
    if (request.serviceId) {
        return servicesMap.get(request.serviceId)?.name ?? request.serviceId;
    }

    if (request.pricingPackageId) {
        return packagesMap.get(request.pricingPackageId)?.name ?? request.pricingPackageId;
    }

    return "General consultation";
}

export default function RequestDetailsModal({
                                                isOpen,
                                                request,
                                                servicesMap,
                                                packagesMap,
                                                onClose,
                                                onStatusChange,
                                                onAdminNoteSave,
                                                onComplete,
                                                onReject,
                                                isSubmitting,
                                            }) {
    const [status, setStatus] = useState(0);
    const [adminNote, setAdminNote] = useState("");

    useEffect(() => {
        if (!request) return;

        setStatus(normalizeStatus(request.status));
        setAdminNote(request.adminNote ?? "");
    }, [request]);

    if (!isOpen || !request) return null;

    const selectedOption = getSelectedOption(request, servicesMap, packagesMap);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Client request
                        </p>

                        <h2 className="font-heading text-3xl font-bold text-brand-ink">
                            {request.fullName}
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <RequestTypeBadge requestType={request.requestType} />
                            <RequestStatusBadge status={request.status} />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-card border border-brand-border bg-brand-pampas p-5">
                        <p className="text-sm font-semibold text-brand-muted">
                            Email
                        </p>
                        <p className="mt-1 font-semibold text-brand-ink">
                            {request.email}
                        </p>
                    </div>

                    <div className="rounded-card border border-brand-border bg-brand-pampas p-5">
                        <p className="text-sm font-semibold text-brand-muted">
                            Phone
                        </p>
                        <p className="mt-1 font-semibold text-brand-ink">
                            {request.phone || "—"}
                        </p>
                    </div>

                    <div className="rounded-card border border-brand-border bg-brand-pampas p-5">
                        <p className="text-sm font-semibold text-brand-muted">
                            Selected option
                        </p>
                        <p className="mt-1 font-semibold text-brand-ink">
                            {selectedOption}
                        </p>
                    </div>

                    <div className="rounded-card border border-brand-border bg-brand-pampas p-5">
                        <p className="text-sm font-semibold text-brand-muted">
                            Created
                        </p>
                        <p className="mt-1 font-semibold text-brand-ink">
                            {formatDate(request.createdAtUtc)}
                        </p>
                    </div>
                </div>

                <div className="mt-5 rounded-card border border-brand-border bg-white p-5">
                    <p className="mb-2 text-sm font-semibold text-brand-muted">
                        Client message
                    </p>
                    <p className="leading-7 text-brand-ink">
                        {request.message || "Клієнт не залишив повідомлення."}
                    </p>
                </div>

                <div className="mt-6 grid gap-5">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Статус заявки
                        </label>

                        <SelectField
                            value={status}
                            onChange={(event) => setStatus(Number(event.target.value))}
                            className="min-h-12"
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </SelectField>

                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => onStatusChange(request.id, status)}
                            className="mt-3 rounded-button bg-brand-madison px-5 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Зберегти статус
                        </Button>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Admin note
                        </label>

                        <textarea
                            value={adminNote}
                            onChange={(event) => setAdminNote(event.target.value)}
                            rows={4}
                            placeholder="Внутрішня нотатка для адміністратора"
                            className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                        />

                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() =>
                                onAdminNoteSave(request.id, adminNote.trim())
                            }
                            className="mt-3 rounded-button border border-brand-madison bg-white px-5 py-3 font-semibold text-brand-madison transition-colors hover:bg-brand-madison hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Зберегти нотатку
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-3 border-t border-brand-border pt-5">
                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => onComplete(request.id)}
                            className="rounded-button bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Mark completed
                        </Button>

                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => onReject(request.id)}
                            className="rounded-button bg-red-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}