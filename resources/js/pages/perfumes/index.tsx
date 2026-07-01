import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useLanguage } from '@/hooks/use-language';
import { useState } from 'react';
import { PerfumeCard, PerfumeFilters } from '@/features/Perfumes';
import type { Perfume } from '@/features/Perfumes/types';
import type { Season } from '@/features/Seasons/types';
import type { FragranceCategory } from '@/features/FragranceCategories/types';

interface PageProps {
    perfumes: Perfume[];
    seasons: Season[];
    fragranceCategories: FragranceCategory[];
}

export default function PerfumesIndex() {
    const { perfumes, seasons, fragranceCategories } = usePage<PageProps>().props;
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('perfume.browse'), href: '/perfumes' },
    ];
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const stats = {
        total: perfumes.length,
        men: perfumes.filter((p) =>
            p.fragrance_categories?.some((c) => /erkek|male|ذكر/i.test(c.slug ?? ''))
        ).length,
        women: perfumes.filter((p) =>
            p.fragrance_categories?.some((c) => /kadin|female|أنثى/i.test(c.slug ?? ''))
        ).length,
        niche: perfumes.filter((p) =>
            p.fragrance_categories?.some((c) => c.type === 'niche')
        ).length,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('perfume.browse')} />
            <div className="container mx-auto space-y-6 p-6">


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
                        {perfumes.length} {t('perfume.results_found')}
                    </p>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder={t('perfume.sort_by')} />
                        </SelectTrigger>
                    </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {perfumes.map((perfume) => (
                        <PerfumeCard
                            key={perfume.id}
                            perfume={perfume}
                            onViewDetails={(p) => window.location.href = route('perfumes.show', p.id)}
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
