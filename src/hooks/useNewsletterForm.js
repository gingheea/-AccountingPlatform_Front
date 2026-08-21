import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "../services/newsletterService";
import { getApiErrorMessage } from "../utils/apiError";

/**
 * There are three newsletter forms on the site with different markup. So what
 * is shared is not the form but the logic: field state, submit, messages.
 * Each form keeps its own styling.
 *
 * @param source where the signup came from, so it is visible which form works
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
