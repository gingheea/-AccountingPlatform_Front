"use client";

import SelectField from "../ui/SelectField";
import { Button, Input } from "@relume_io/relume-ui";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getServices } from "../../services/servicesService";
import { getPricingPackages } from "../../services/pricingPackagesService";
import { createClientRequest } from "../../services/clientRequestsService";
import { getApiErrorMessage } from "../../utils/apiError";

function Spinner() {
    return (
        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    );
}

const REQUEST_TYPES = {
    Service: "0",
    Package: "1",
    GeneralConsultation: "2",
};

/**
 * @param initialContact  дані залогіненого клієнта — щоб у кабінеті не вводити
 *                        імʼя й пошту вдруге. Поля лишаються редагованими.
 * @param onCreated       викликається після успішної відправки: кабінету треба
 *                        оновити список заявок і закрити вікно.
 * @param compact         у кабінеті великий заголовок форми зайвий.
 */
export function ClientRequestForm({ initialContact, onCreated, compact = false }) {
    const [services, setServices] = useState([]);
    const [pricingPackages, setPricingPackages] = useState([]);

    const [form, setForm] = useState({
        fullName: initialContact?.fullName ?? "",
        email: initialContact?.email ?? "",
        phone: "",
        requestType: REQUEST_TYPES.GeneralConsultation,
        serviceId: "",
        pricingPackageId: "",
        message: "",
    });

    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadOptions() {
            try {
                const [servicesData, packagesData] = await Promise.all([
                    getServices(),
                    getPricingPackages(),
                ]);

                if (!isMounted) return;

                setServices([...servicesData].sort((a, b) => a.sortOrder - b.sortOrder));
                setPricingPackages(
                    [...packagesData].sort((a, b) => a.sortOrder - b.sortOrder),
                );
            } catch (error) {
                console.error("Failed to load request options:", error);

                if (!isMounted) return;

                setErrorMessage("Не вдалося завантажити послуги та пакети.");
            } finally {
                if (isMounted) {
                    setIsLoadingOptions(false);
                }
            }
        }

        loadOptions();

        return () => {
            isMounted = false;
        };
    }, []);

    const selectedOptions = useMemo(() => {
        if (form.requestType === REQUEST_TYPES.Service) {
            return services;
        }

        if (form.requestType === REQUEST_TYPES.Package) {
            return pricingPackages;
        }

        return [];
    }, [form.requestType, services, pricingPackages]);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleRequestTypeChange = (event) => {
        setForm((prev) => ({
            ...prev,
            requestType: event.target.value,
            serviceId: "",
            pricingPackageId: "",
        }));
    };

    const handleSelectedOptionChange = (event) => {
        const selectedId = event.target.value;

        setForm((prev) => ({
            ...prev,
            serviceId:
                prev.requestType === REQUEST_TYPES.Service ? selectedId : "",
            pricingPackageId:
                prev.requestType === REQUEST_TYPES.Package ? selectedId : "",
        }));
    };

    const selectedOptionValue =
        form.requestType === REQUEST_TYPES.Service
            ? form.serviceId
            : form.requestType === REQUEST_TYPES.Package
                ? form.pricingPackageId
                : "";

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (form.requestType === REQUEST_TYPES.Service && !form.serviceId) {
            setErrorMessage("Оберіть конкретну послугу.");
            return;
        }

        if (form.requestType === REQUEST_TYPES.Package && !form.pricingPackageId) {
            setErrorMessage("Оберіть конкретний пакет.");
            return;
        }

        const payload = {
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || null,
            message: form.message.trim() || null,
            requestType: Number(form.requestType),
            serviceId:
                form.requestType === REQUEST_TYPES.Service ? form.serviceId : null,
            pricingPackageId:
                form.requestType === REQUEST_TYPES.Package
                    ? form.pricingPackageId
                    : null,
        };

        try {
            setIsSubmitting(true);

            await createClientRequest(payload);

            toast.success("Заявку надіслано! Я звʼяжуся з вами найближчим часом.");
            setSuccessMessage("Заявку надіслано. Я звʼяжуся з вами найближчим часом.");

            onCreated?.();

            setForm({
                fullName: initialContact?.fullName ?? "",
                email: initialContact?.email ?? "",
                phone: "",
                requestType: REQUEST_TYPES.GeneralConsultation,
                serviceId: "",
                pricingPackageId: "",
                message: "",
            });
        } catch (error) {
            console.error("Failed to create client request:", error);

            const message = getApiErrorMessage(
                error,
                "Не вдалося надіслати заявку. Перевірте дані або спробуйте пізніше.",
            );

            toast.error(message);
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-card border border-brand-border bg-white p-6 shadow-card md:p-8"
        >
            {!compact && (
                <div className="mb-8">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison">
                        Форма заявки
                    </p>

                    <h3 className="font-heading text-3xl font-bold leading-tight text-brand-ink md:text-4xl">
                        Залиште запит на консультацію
                    </h3>

                    <p className="mt-4 leading-7 text-brand-muted">
                        Оберіть послугу або пакет, залиште контакти — я уточню деталі та
                        підкажу найкращий формат супроводу.
                    </p>
                </div>
            )}

            <div className="grid gap-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Імʼя та прізвище *
                    </label>

                    <Input
                        type="text"
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        required
                        placeholder="Ваше імʼя"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Email *
                    </label>

                    <Input
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        required
                        placeholder="name@example.com"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Телефон
                    </label>

                    <Input
                        type="tel"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="+38 (095) 123-45-67"
                        className="min-h-12 rounded-button border-brand-border bg-brand-pampas px-4 text-brand-ink placeholder:text-brand-gothic focus:border-brand-madison focus:ring-brand-madison"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Що вас цікавить? *
                    </label>

                    <SelectField
                        value={form.requestType}
                        onChange={handleRequestTypeChange}
                        className="min-h-12"
                    >
                        <option value={REQUEST_TYPES.GeneralConsultation}>
                            Не знаю, потрібна консультація
                        </option>
                        <option value={REQUEST_TYPES.Service}>Конкретна послуга</option>
                        <option value={REQUEST_TYPES.Package}>Пакет супроводу</option>
                    </SelectField>
                </div>

                {form.requestType !== REQUEST_TYPES.GeneralConsultation && (
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-brand-ink">
                            {form.requestType === REQUEST_TYPES.Service
                                ? "Оберіть послугу *"
                                : "Оберіть пакет *"}
                        </label>

                        <SelectField
                            value={selectedOptionValue}
                            onChange={handleSelectedOptionChange}
                            disabled={isLoadingOptions}
                            className="min-h-12 disabled:cursor-not-allowed disabled:opacity-"
                        >
                            <option value="">
                                {isLoadingOptions ? "Завантаження..." : "Оберіть варіант"}
                            </option>

                            {selectedOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </SelectField>
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-semibold text-brand-ink">
                        Повідомлення
                    </label>

                    <textarea
                        value={form.message}
                        onChange={handleChange("message")}
                        rows={5}
                        placeholder="Коротко опишіть вашу ситуацію або питання"
                        className="w-full resize-none rounded-button border border-brand-border bg-brand-pampas px-4 py-3 text-brand-ink outline-none transition-colors placeholder:text-brand-gothic focus:border-brand-madison focus:ring-2 focus:ring-brand-madison/20"
                    />
                </div>
            </div>

            {successMessage && (
                <p className="mt-5 rounded-button bg-brand-pampas px-4 py-3 text-sm font-medium text-brand-madison">
                    {successMessage}
                </p>
            )}

            {errorMessage && (
                <p className="mt-5 rounded-button bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {errorMessage}
                </p>
            )}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-button bg-brand-madison px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-madisonDark disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Надсилання..." : "Надіслати заявку"}
            </Button>

            <p className="mt-4 text-xs leading-5 text-brand-muted">
                Натискаючи “Надіслати заявку”, ви погоджуєтесь, що з вами можуть
                звʼязатися для уточнення деталей.
            </p>
        </form>
    );
}