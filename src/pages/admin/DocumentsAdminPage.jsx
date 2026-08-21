"use client";

import SelectField from "../../components/ui/SelectField";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@relume_io/relume-ui";
import {
    changeDocumentStatus,
    deleteDocument,
    getDocumentDownloadUrl,
    getDocuments,
    triggerDownload,
    uploadDocument,
} from "../../services/documentsService";
import { getAllUsers } from "../../services/usersService";
import Pagination from "../../components/ui/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../services/paging";
import DocumentsTable from "../../components/admin/documents/DocumentsTable";
import RejectDocumentModal from "../../components/admin/documents/RejectDocumentModal";
import UploadDocumentModal from "../../components/documents/UploadDocumentModal";
import {
    DOCUMENT_CATEGORIES,
    DOCUMENT_DIRECTIONS,
    DOCUMENT_STATUSES,
} from "../../constants/documents";
import { getApiErrorMessage } from "../../utils/apiError";

const REJECTED_STATUS = 3;

const filterClass = "min-h-11";

export default function DocumentsAdminPage() {
    const [documents, setDocuments] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [rejectTarget, setRejectTarget] = useState(null);

    const [filters, setFilters] = useState({
        userId: "",
        category: "",
        direction: "",
        status: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [total, setTotal] = useState(0);

    const usersById = useMemo(
        () => Object.fromEntries(users.map((user) => [user.id, user])),
        [users],
    );

    async function loadDocuments() {
        try {
            setIsLoading(true);

            const page = await getDocuments({ ...filters, page: currentPage, pageSize });

            setDocuments(page.items);
            setTotal(page.total);
        } catch (error) {
            console.error("Failed to load documents:", error);
            toast.error("Не вдалося завантажити документи.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function loadUsers() {
            try {
                setUsers(await getAllUsers());
            } catch (error) {
                console.error("Failed to load users:", error);
            }
        }

        loadUsers();
    }, []);

    useEffect(() => {
        loadDocuments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, currentPage, pageSize]);

    const handleFilterChange = (field) => (event) => {
        const { value } = event.target;

        // Зміна фільтра завжди повертає на першу сторінку: інакше можна лишитись
        // на пʼятій сторінці списку, у якому після фільтра всього одна.
        setCurrentPage(1);
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpload = async (payload) => {
        try {
            setIsSubmitting(true);

            await uploadDocument(payload);

            toast.success("Документ завантажено.");
            setIsUploadOpen(false);
            await loadDocuments();

            return true;
        } catch (error) {
            console.error("Failed to upload document:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося завантажити документ."));

            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDownload = async (document) => {
        try {
            setDownloadingId(document.id);

            const { url } = await getDocumentDownloadUrl(document.id);

            triggerDownload(url);
        } catch (error) {
            console.error("Failed to get download url:", error);
            toast.error("Не вдалося отримати файл.");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleChangeStatus = async (document, status) => {
        // Rejection needs a reason, so it goes through its own modal.
        if (status === REJECTED_STATUS) {
            setRejectTarget(document);
            return;
        }

        try {
            await changeDocumentStatus(document.id, status);

            toast.success("Статус змінено.");
            await loadDocuments();
        } catch (error) {
            console.error("Failed to change document status:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося змінити статус документа."));
        }
    };

    const handleReject = async (note) => {
        try {
            setIsSubmitting(true);

            await changeDocumentStatus(rejectTarget.id, REJECTED_STATUS, note);

            toast.success("Документ відхилено.");
            setRejectTarget(null);
            await loadDocuments();
        } catch (error) {
            console.error("Failed to reject document:", error);
            toast.error("Не вдалося відхилити документ.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (document) => {
        if (
            !window.confirm(
                `Видалити «${document.title}»? Файл буде стерто зі сховища назавжди.`,
            )
        ) {
            return;
        }

        try {
            await deleteDocument(document.id);

            toast.success("Документ видалено.");
            await loadDocuments();
        } catch (error) {
            console.error("Failed to delete document:", error);
            toast.error("Не вдалося видалити документ.");
        }
    };

    return (
        <section>
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Documents
                    </p>

                    <h1 className="font-heading text-4xl font-bold leading-tight text-brand-ink md:text-5xl">
                        Документи клієнтів
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-brand-muted">
                        Приймайте первинні документи від клієнтів і передавайте їм готову
                        звітність, рахунки та акти.
                    </p>
                </div>

                <Button
                    onClick={() => setIsUploadOpen(true)}
                    className="rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark"
                >
                    Завантажити документ
                </Button>
            </div>

            <div className="mb-6 rounded-card border border-brand-border bg-white p-5 shadow-soft">
                <div className="grid gap-3 md:grid-cols-4">
                    <SelectField
                        value={filters.userId}
                        onChange={handleFilterChange("userId")}
                        className={filterClass}
                    >
                        <option value="">Усі клієнти</option>

                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.fullName || user.email}
                            </option>
                        ))}
                    </SelectField>

                    <SelectField
                        value={filters.category}
                        onChange={handleFilterChange("category")}
                        className={filterClass}
                    >
                        <option value="">Усі категорії</option>

                        {DOCUMENT_CATEGORIES.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </SelectField>

                    <SelectField
                        value={filters.direction}
                        onChange={handleFilterChange("direction")}
                        className={filterClass}
                    >
                        <option value="">Будь-який напрямок</option>

                        {DOCUMENT_DIRECTIONS.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </SelectField>

                    <SelectField
                        value={filters.status}
                        onChange={handleFilterChange("status")}
                        className={filterClass}
                    >
                        <option value="">Усі статуси</option>

                        {DOCUMENT_STATUSES.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </SelectField>
                </div>
            </div>

            {isLoading ? (
                <div className="rounded-card border border-brand-border bg-white p-8 shadow-soft">
                    <p className="text-brand-muted">Завантаження документів...</p>
                </div>
            ) : (
                <>
                <DocumentsTable
                    documents={documents}
                    usersById={usersById}
                    onDownload={handleDownload}
                    onChangeStatus={handleChangeStatus}
                    onDelete={handleDelete}
                    downloadingId={downloadingId}
                />

                <Pagination
                    page={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size) => {
                        setCurrentPage(1);
                        setPageSize(size);
                    }}
                />
                </>
            )}

            <UploadDocumentModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onSubmit={handleUpload}
                isSubmitting={isSubmitting}
                users={users}
            />

            <RejectDocumentModal
                isOpen={Boolean(rejectTarget)}
                document={rejectTarget}
                onClose={() => setRejectTarget(null)}
                onSubmit={handleReject}
                isSubmitting={isSubmitting}
            />
        </section>
    );
}
