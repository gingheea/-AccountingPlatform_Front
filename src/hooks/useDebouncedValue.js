import { useEffect, useState } from "react";

/**
 * Returns a value only after it has stopped changing for a while.
 *
 * Needed for the search that now runs on the server: without a delay a request
 * would fly on every keystroke, a dozen instead of one, and the responses
 * could arrive in a different order than they were sent.
 */
export function useDebouncedValue(value, delayMs = 350) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delayMs);

        // Every new keystroke cancels the previous timer, which is why only the
        // last one fires, once the user has stopped typing.
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
}
