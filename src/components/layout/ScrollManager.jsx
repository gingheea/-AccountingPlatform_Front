import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does not manage scrolling. Without this component:
 *  - navigating leaves you at the same scroll offset you were at;
 *  - an anchor link (say /#contact) from another page simply opens the
 *    home page at the top and scrolls nowhere.
 *
 * Renders nothing; it only watches the address for changes.
 */
export default function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // The element appears in the DOM only after the page has rendered,
            // so we wait for the next frame.
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
