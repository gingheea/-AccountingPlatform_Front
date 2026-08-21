/**
 * Pulls a readable error message out of an API response.
 *
 * The backend's ExceptionHandlingMiddleware returns either
 * { errors: [{ field, message }] } for validation errors or { title } for the
 * rest. Without this a toast shows only a generic phrase.
 */
export function getApiErrorMessage(error, fallback) {
    const data = error?.response?.data;

    const validationMessages = data?.errors
        ?.map((item) => item?.message)
        .filter(Boolean);

    if (validationMessages?.length) {
        return validationMessages.join(" ");
    }

    return data?.title || fallback;
}
