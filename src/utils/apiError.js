/**
 * Дістає читабельний текст помилки з відповіді API.
 *
 * ExceptionHandlingMiddleware на беку віддає або { errors: [{ field, message }] }
 * для помилок валідації, або { title } для решти. Без цього в тості видно лише
 * загальну фразу, і причину 400-ї доводиться шукати в консолі.
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
