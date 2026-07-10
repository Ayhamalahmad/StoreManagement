import { usePage } from '@inertiajs/react';

export function useCurrentUrl() {
    const page = usePage();
    const currentUrlPath = new URL(page.url, window.location.origin).pathname;

    const isCurrentUrl = (urlToCheck: string | { url: string }, currentUrl?: string) => {
        const urlToCompare = currentUrl ?? currentUrlPath;
        const urlString = typeof urlToCheck === 'string' ? urlToCheck : urlToCheck.url;

        if (!urlString.startsWith('http')) {
            return urlString === urlToCompare;
        }

        try {
            const absoluteUrl = new URL(urlString);
            return absoluteUrl.pathname === urlToCompare;
        } catch {
            return false;
        }
    };

    return { currentUrl: currentUrlPath, isCurrentUrl };
}
