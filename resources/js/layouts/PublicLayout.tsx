import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/theme-toggle';
import type { ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
}

interface CustomPageProps {
    [key: string]: unknown;
    auth: { user?: { name: string } | null };
    currentStore?: { id: number; name: string; slug: string } | null;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const { t, isRtl } = useTranslation();
    const { auth, currentStore } = usePage<CustomPageProps>().props;
    const store = currentStore;

    return (
        <div className="min-h-screen bg-background text-foreground" dir={isRtl ? 'rtl' : 'ltr'}>
            <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href={store ? '/' + store.slug : '/'} className="text-xl font-bold">
                        {store ? store.name : t('Store Management')}
                    </Link>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageSwitcher />
                        {auth?.user ? (
                            <Link
                                href={store ? '/' + store.slug + '/dashboard' : '/dashboard'}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                {t('Dashboard')}
                            </Link>
                        ) : (
                            <Link
                                href={store ? '/' + store.slug + '/login' : '/login'}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                {t('Admin')}
                            </Link>
                        )}
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
                {children}
            </main>
        </div>
    );
}
