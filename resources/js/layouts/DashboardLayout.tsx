import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ScrollToTop } from '@/components/scroll-to-top';
import { useTranslation } from '@/hooks/use-translation';
import type { BreadcrumbItemType } from '@/components/breadcrumbs';

function FlashListener() {
    const { response } = usePage().props;

    useEffect(() => {
        if (response) {
            const lower = String(response).toLowerCase();
            if (lower.startsWith('failed') || lower.startsWith('error')) {
                toast.error(String(response));
            } else {
                toast.success(String(response));
            }
        }
    }, [response]);

    return null;
}

interface DashboardLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItemType[];
}

export default function DashboardLayout({ children, breadcrumbs = [] }: DashboardLayoutProps) {
    const { isRtl } = useTranslation();

    return (
        <AppShell variant="sidebar" dir={isRtl ? 'rtl' : 'ltr'}>
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppHeader />
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="flex-1 p-6">
                    {children}
                </div>
            </AppContent>
            <ScrollToTop />
            <FlashListener />
        </AppShell>
    );
}
