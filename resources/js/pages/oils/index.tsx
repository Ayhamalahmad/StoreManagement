import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useLanguage } from '@/hooks/use-language';
import { useState } from 'react';
import { OilCard, OilFilters } from '@/features/Oils';
import type { Oil } from '@/features/Oils/types';

interface PageProps {
    oils: Oil[];
}

export default function OilsIndex({ oils }: PageProps) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('oil.browse'), href: '/oils' },
    ];
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const stats = {
        total: oils.length,
        essential: oils.filter((o) =>
            Object.values(o.category ?? {}).some((v) => /essential|esansiyel|عطري/i.test(v))
        ).length,
        fragrance: oils.filter((o) =>
            Object.values(o.category ?? {}).some((v) => /fragrance|koku|عطر/i.test(v))
        ).length,
        carrier: oils.filter((o) =>
            Object.values(o.category ?? {}).some((v) => /carrier|taşıyıcı|ناقل/i.test(v))
        ).length,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('oil.browse')} />
            <div className="container mx-auto space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('oil.browse')}</h1>
                        <p className="text-muted-foreground">{t('oil.browse.desc')}</p>
                    </div>
                    <Link href={route('oils.manage')}>
                        <Button>{t('oil.add_btn')}</Button>
                    </Link>
                </div>

                <OilFilters
                    search={search}
                    onSearchChange={setSearch}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="text-muted-foreground">{t('oil.total_count')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.essential}</p>
                            <p className="text-muted-foreground">{t('oil.essential_count')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.fragrance}</p>
                            <p className="text-muted-foreground">{t('oil.fragrance_count')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.carrier}</p>
                            <p className="text-muted-foreground">{t('oil.carrier_count')}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                        {oils.length} {t('oil.results_found')}
                    </p>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder={t('oil.sort_by')} />
                        </SelectTrigger>
                    </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {oils.map((oil) => (
                        <OilCard
                            key={oil.id}
                            oil={oil}
                            onViewDetails={(o) => window.location.href = route('oils.show', o.id)}
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-2">
                    <Button variant="outline" size="icon">
                        <ChevronLeft />
                    </Button>
                    <Button>1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
