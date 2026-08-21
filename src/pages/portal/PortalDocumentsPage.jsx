"use client";

import SelectField from "../../components/ui/SelectField";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import { RxDownload } from "react-icons/rx";
import {
    getMyDocumentDownloadUrl,
    getMyDocuments,
    triggerDownload,
    uploadMyDocument,
} from "../../services/documentsService";
import UploadDocumentModal from "../../components/documents/UploadDocumentModal";
import Pagination from "../../components/ui/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../services/paging";
import { getApiErrorMessage } from "../../utils/apiError";
import {
    DOCUMENT_CATEGORIES,
    DOCUMENT_STATUS_CLASSES,
    categoryLabel,
    formatDocumentDate,
    formatFileSize,
    statusLabel,
} from "../../constants/documents";

const directionTabs = [
    { value: "", label: "Усі" },
    { value: 1, label: "Від бухгалтера" },
    { value: 0, label: "Мої завантаження" },
];

export default function PortalDocumentsPage() {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);

    const [direction, setDirection] = useState("");
    const [category, setCategory] = useState("");

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

    const [counts, setCounts] = useState({ fromAccountant: 0, fromClient: 0 });

    // Bumped after a document upload so the counters are re-read.
    const [countsKey, setCountsKey] = useState(0);

    async function loadDocuments() {
        try {
            setIsLoading(true);

            const result = await getMyDocuments({ direction, category, page, pageSize });

            setDocuments(result.items);
            setTotal(result.total);
        } catch (error) {
            console.error("Failed to load documents:", error);
            toast.error("Не вдалося завантажити документи.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadDocuments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction, category, page, pageSize]);

    /**
     * The counters come from two separate requests, and we read only total.
     *
     * Counting from the loaded list is no longer possible: it now holds a single
     * page, and the client would see "3 documents" instead of "47": a mistake
     * that looks like a working number.
     *
     * pageSize: 1, because we do not need the rows themselves, only the count.
     */
    useEffect(() => {
        let isActive = true;

        Promise.all([
            getMyDocuments({ direction: 1, pageSize: 1 }),
            getMyDocuments({ direction: 0, pageSize: 1 }),
        ])
            .then(([fromAccountant, fromClient]) => {
                if (!isActive) return;

                setCounts({
                    fromAccountant: fromAccountant.total,
                    fromClient: fromClient.total,
                });
            })
            .catch((error) => console.error("Failed to load document counts:", error));

        return () => {
            isActive = false;
        };
    }, [countsKey]);

    const handleUpload = async (payload) => {
        try {
            setIsUploading(true);

            await uploadMyDocument(payload);

            toast.success("Документ завантажено.");
            setIsModalOpen(false);
            await loadDocuments();
            setCountsKey((key) => key + 1);

            return true;
        } catch (error) {
            console.error("Failed to upload document:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося завантажити документ."));

            return false;
        } finally {
            setIsUploading(false);
        }
    };

    const handleDownload = async (document) => {
        try {
            setDownloadingId(document.id);

            const { url } = await getMyDocumentDownloadUrl(document.id);

            triggerDownload(url);
        } catch (error) {
            console.error("Failed to get download url:", error);
            toast.error("Не вдалося отримати файл.");
        } finally {
            setDownloadingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <section className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Documents
                        </p>

                        <h2 className="font-heading text-4xl font-bold text-brand-ink">
                            Документи
                        </h2>

                        <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                            Файли, які ви передали бухгалтеру, і документи, які бухгалтер
                            підготував для вас: звітність, рахунки, акти, договори.
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                    >
                        Завантажити документ
                    </Button>
                </div>
            </section>

            <section className="grid gap-5 md:grid-cols-3">
                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">Усього документів</p>

                    {/* Not documents.length: that is only the current page. There are
                        exactly two directions, so their sum is the full count. */}
                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        {counts.fromAccountant + counts.fromClient}
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">Від бухгалтера</p>

                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        {counts.fromAccountant}
                    </p>
                </div>

                <div className="rounded-card border border-brand-border bg-white p-6 shadow-soft">
                    <p className="text-sm font-semibold text-brand-muted">Мої завантаження</p>

                    <p className="mt-3 font-heading text-4xl font-bold text-brand-madison">
                        {counts.fromClient}
                    </p>
                </div>
            </section>

            <section className="rounded-card border border-brand-border bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {directionTabs.map((tab) => (
                            <button
                                key={tab.label}
                                type="button"
                                onClick={() => {
                                    setPage(1);
                                    setDirection(tab.value);
                                }}
                                className={`rounded-button px-4 py-2 text-sm font-semibold transition ${
                                    direction === tab.value
                                        ? "bg-brand-madison text-white"
                                        : "border border-brand-border text-brand-muted hover:bg-brand-pampas"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <SelectField
                        value={category}
                        onChange={(event) => {
                            setPage(1);
                            setCategory(event.target.value);
                        }}
                        className="min-h-11"
                    >
                        <option value="">Усі категорії</option>

                        {DOCUMENT_CATEGORIES.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </SelectField>
                </div>
            </section>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження документів...</p>
                </div>
            ) : documents.length === 0 ? (
                <div className="rounded-card border border-brand-border bg-white p-8 text-center shadow-soft">
                    <h3 className="font-heading text-2xl font-bold text-brand-ink">
                        Документів ще немає
                    </h3>

                    <p className="mt-2 text-brand-muted">
                        Завантажте первинні документи для бухгалтера — або зачекайте, поки
                        він додасть готові файли для вас.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-card border border-brand-border bg-white shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-brand-border">
                            <thead className="bg-brand-pampas">
                            <tr>
                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Документ
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Категорія
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Статус
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Дата
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                                    Дія
                                </th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-brand-border bg-white">
                            {documents.map((document) => (
                                <tr key={document.id} className="transition hover:bg-brand-pampas/40">
                                    <td className="px-5 py-5">
                                        <p className="font-semibold text-brand-ink">
                                            {document.title}
                                        </p>

                                        <p className="mt-1 text-sm text-brand-muted">
                                            {document.fileName} · {formatFileSize(document.sizeBytes)}
                                            {" · "}
                                            {document.direction === 1
                                                ? "від бухгалтера"
                                                : "ваш файл"}
                                        </p>

                                        {document.note && (
                                            <p className="mt-2 max-w-xl text-sm leading-6 text-brand-muted">
                                                {document.note}
                                            </p>
                                        )}
                                    </td>

                                    <td className="px-5 py-5">
                                        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-madison">
                                            {categoryLabel(document.category)}
                                        </span>
                                    </td>

                                    <td className="px-5 py-5">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                DOCUMENT_STATUS_CLASSES[document.status] ||
                                                "bg-brand-soft text-brand-muted"
                                            }`}
                                        >
                                            {statusLabel(document.status)}
                                        </span>
                                    </td>

                                    <td className="px-5 py-5 text-sm text-brand-muted">
                                        {formatDocumentDate(document.createdAtUtc)}
                                    </td>

                                    <td className="px-5 py-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => handleDownload(document)}
                                            disabled={downloadingId === document.id}
                                            className="inline-flex items-center gap-2 rounded-button border border-brand-border px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-pampas disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <RxDownload className="size-4" />
                                            {downloadingId === document.id
                                                ? "Готуємо..."
                                                : "Завантажити"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-5 pb-5">
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
                    </div>
                </div>
            )}

            <UploadDocumentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpload}
                isSubmitting={isUploading}
            />
        </div>
    );
}
