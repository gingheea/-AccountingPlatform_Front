import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router сам не керує прокруткою. Без цього компонента:
 *  - перехід на іншу сторінку лишає тебе на тій самій висоті, де ти був;
 *  - посилання з якорем (наприклад /#contact) з іншої сторінки просто
 *    відкриває головну зверху й нікуди не прокручує.
 *
 * Нічого не малює — тільки стежить за зміною адреси.
 */
export default function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Елемент зʼявляється в DOM лише після того, як сторінка
            // відмалюється, тому чекаємо наступного кадру.
            const id = hash.slice(1);

            requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            });

            return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname, hash]);

    return null;
}
