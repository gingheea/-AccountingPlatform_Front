/**
 * Скільки номерів показувати навколо поточного. 1 означає «попередній,
 * поточний, наступний» — плюс завжди перша й остання сторінки.
 */
const SIBLINGS = 1;

/** Скільки сторінок ще вміщається без пропусків. */
const MAX_WITHOUT_GAPS = 7;

/**
 * Будує список кнопок гортання: числа й рядки-заглушки там, де сторінки
 * пропущені.
 *
 * Без цього при 40 сторінках у рядок вишикувалось би 40 кнопок. Перша й
 * остання лишаються завжди — до них найчастіше й хочуть стрибнути.
 *
 * Живе окремим файлом, а не всередині компонента, бо це чиста логіка:
 * її можна перевірити, не малюючи жодної кнопки.
 */
export function buildPageNumbers(currentPage, totalPages) {
    if (totalPages <= MAX_WITHOUT_GAPS) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set([1, totalPages, currentPage]);

    for (let offset = 1; offset <= SIBLINGS; offset++) {
        pages.add(currentPage - offset);
        pages.add(currentPage + offset);
    }

    const sorted = [...pages]
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b);

    // Уставляємо заглушку там, де між сусідніми номерами є розрив.
    const result = [];

    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) {
            result.push(`gap-${page}`);
        }

        result.push(page);
    });

    return result;
}
