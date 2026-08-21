import { useEffect, useState } from "react";

/**
 * Віддає значення із затримкою після того, як воно перестало змінюватись.
 *
 * Потрібно для пошуку, який тепер виконує сервер: без затримки запит летів би
 * на кожну натиснуту літеру — десяток запитів замість одного, і відповіді
 * могли б прийти не в тому порядку, у якому їх надіслали.
 */
export function useDebouncedValue(value, delayMs = 350) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delayMs);

        // Кожне нове натискання скасовує попередній таймер — саме тому
        // спрацьовує лише останній, коли користувач зупинився.
        return () => clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
}
