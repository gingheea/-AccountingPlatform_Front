/**
 * The site's external links in one place.
 *
 * An empty string means "no such account": those icons are simply not
 * rendered. Better than a link to nowhere: a visitor does not click something
 * broken, and we do not have to invent addresses that do not exist.
 *
 * Fill in the ones that really exist and they will appear by themselves.
 */
export const SOCIAL_LINKS = {
    facebook: "",
    instagram: "",
    x: "",
    linkedin: "",
    telegram: "",
};

/** Only the filled-in ones; those are what gets rendered. */
export function activeSocialLinks() {
    return Object.entries(SOCIAL_LINKS)
        .filter(([, url]) => Boolean(url))
        .map(([key, url]) => ({ key, url }));
}
