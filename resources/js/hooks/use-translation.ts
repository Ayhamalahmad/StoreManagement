import { usePage, router } from '@inertiajs/react';
import { useCallback } from 'react';

type TranslationMap = Record<string, string>;

export function useTranslation() {
    const { translations, locale, supportedLocales } = usePage<{
        [key: string]: unknown;
        translations: TranslationMap;
        locale: string;
        supportedLocales: string[];
    }>().props;

    const t = useCallback(
        (key: string, fallback?: string): string => {
            return translations?.[key] ?? fallback ?? key;
        },
        [translations],
    );

    const switchLocale = useCallback(
        (newLocale: string) => {
            const currentUrl = window.location.pathname + window.location.search;
            const separator = currentUrl.includes('?') ? '&' : '?';
            const newUrl = currentUrl.replace(/[?&]lang=[a-z]+/, '');

            router.visit(newUrl + separator + 'lang=' + newLocale, {
                preserveScroll: true,
                preserveState: true,
            });
        },
        [],
    );

    const isRtl = locale === 'ar';

    return { t, locale, switchLocale, supportedLocales, isRtl };
}
