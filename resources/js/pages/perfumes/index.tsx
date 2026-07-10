import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useLanguage } from '@/hooks/use-language';
import { useState } from 'react';
import { PerfumeCard, PerfumeFilters, PerfumeStats } from '@/features/Perfumes';
import type { Perfume } from '@/features/Perfumes/types';
import type { Season } from '@/features/Seasons/types';
import type { FragranceCategory } from '@/features/FragranceCategories/types';
import type { SillageLevel } from '@/features/SillageLevels/types';

interface PageProps {
    perfumes: {
        data: Perfume[];
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
    };
    stats: {
        total: number;
        men: number;
        women: number;
        niche: number;
    };
    seasons: Season[];
    fragranceCategories: FragranceCategory[];
    sillageLevels: SillageLevel[];
}

export default function PerfumesIndex() {
    const { perfumes, stats, seasons, fragranceCategories, sillageLevels } = usePage<PageProps>().props;
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('perfume.browse'), href: '/perfumes' },
    ];
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('perfume.browse')} />
            <div className="container mx-auto space-y-6 p-6">


                <PerfumeStats stats={stats} />

                <PerfumeFilters
                    search={search}
                    onSearchChange={setSearch}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    fragranceCategories={fragranceCategories}
                    seasons={seasons}
                />

                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                        {perfumes.total} {t('perfume.results_found')}
                    </p>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder={t('perfume.sort_by')} />
                        </SelectTrigger>
                    </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {perfumes.data.map((perfume) => (
                        <PerfumeCard
                            key={perfume.id}
                            perfume={perfume}
                            onViewDetails={(p) => router.get(route('perfumes.show', p.id))}
                        />
                    ))}
                </div>

                {perfumes.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={perfumes.current_page === 1}
                            onClick={() => router.get(route('perfumes.index', { page: perfumes.current_page - 1 }))}
                        >
                            <ChevronLeft />
                        </Button>
                        {Array.from({ length: perfumes.last_page }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === perfumes.current_page ? 'default' : 'outline'}
                                onClick={() => router.get(route('perfumes.index', { page }))}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={perfumes.current_page === perfumes.last_page}
                            onClick={() => router.get(route('perfumes.index', { page: perfumes.current_page + 1 }))}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
