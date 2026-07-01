import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage, type Locale } from '@/hooks/use-language';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Check, Globe } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { locale, setLocale } = useLanguage();

    const locales: { value: Locale; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'tr', label: 'Türkçe' },
        { value: 'ar', label: 'العربية' },
    ];

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="ml-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-9 min-w-9 px-2 text-xs font-semibold uppercase tracking-wider">
                            <Globe className="mr-1 h-3.5 w-3.5" />
                            {locale.toUpperCase()}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {locales.map((l) => (
                            <DropdownMenuItem key={l.value} onClick={() => setLocale(l.value)}>
                                {locale === l.value && <Check className="mr-2 h-4 w-4" />}
                                <span className={locale === l.value ? 'ml-0' : 'ml-6'}>{l.label}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
