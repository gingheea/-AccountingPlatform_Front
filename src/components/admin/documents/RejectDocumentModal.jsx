"use client";

import React, { useState } from "react";
import { Button } from "@relume_io/relume-ui";
import { RxCross2 } from "react-icons/rx";

export default function RejectDocumentModal({
                                                isOpen,
                                                document,
                                                onClose,
                                                onSubmit,
                                                isSubmitting,
                                            }) {
    const [note, setNote] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onSubmit(note.trim() || null);
        setNote("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8">
            <div className="w-full max-w-lg rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                            Documents
                        </p>

                        <h2 className="font-heading text-2xl font-bold text-brand-ink">
                            Відхилити документ
                        </h2>

                        <p className="mt-2 text-sm text-brand-muted">
                            {document?.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-button bg-brand-pampas text-brand-madison transition-colors hover:bg-brand-soft"
                    >
                        <RxCross2 className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            Причина
                        </label>

                        <textarea
                            value={note}
                            onChange={(event) => setNote(event.target.value)}
                            rows={4}
                            placeholder="Клієнт побачить цей коментар у порталі"
                            className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                        />
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="rounded-button border border-brand-border bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-pampas"
                        >
                            Скасувати
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-button bg-red-600 px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Збереження..." : "Відхилити"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
