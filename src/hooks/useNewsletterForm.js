import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "../services/newsletterService";
import { getApiErrorMessage } from "../utils/apiError";

/**
 * Форм підписки на сайті три, і вони мають різну верстку. Тому спільною
 * робимо не саму форму, а логіку: стан поля, відправку, повідомлення.
 * Кожна форма лишається зі своїм оформленням.
 *
 * @param source звідки підписались — щоб потім було видно, яка форма працює
 */
export function useNewsletterForm(source) {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleSetEmail = (event) => setEmail(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        const value = email.trim();

        if (!value) {
            toast.error("Вкажіть адресу пошти.");
            return;
        }

        try {
            setIsSubmitting(true);

            await subscribeToNewsletter(value, source);

            toast.success("Готово! Ви підписані на оновлення.");
            setEmail("");
            setIsDone(true);
        } catch (error) {
            console.error("Failed to subscribe:", error);
            toast.error(getApiErrorMessage(error, "Не вдалося підписатися. Спробуйте пізніше."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return { email, isSubmitting, isDone, handleSetEmail, handleSubmit };
}
