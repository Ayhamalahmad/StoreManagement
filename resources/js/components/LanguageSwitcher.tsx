import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';

const localeNames: Record<string, string> = {
    en: 'English',
    tr: 'Turkish',
    ar: 'Arabic',
};

const localeEmojis: Record<string, string> = {
    en: '🇬🇧',
    tr: '🇹🇷',
    ar: '🇸🇦',
};

export function LanguageSwitcher() {
    const { t, locale, switchLocale, supportedLocales } = useTranslation();

    const nextLocale = supportedLocales.find((l) => l !== locale) ?? 'en';

    return (
        <div className="flex items-center gap-1">
            {supportedLocales.map((l) => (
                <Button
                    key={l}
                    variant={locale === l ? 'default' : 'ghost'}
                    size="sm"
                    className="text-xs px-2"
                    onClick={() => switchLocale(l)}
                >
                    {localeEmojis[l]} {t(localeNames[l])}
                </Button>
            ))}
        </div>
    );
}
