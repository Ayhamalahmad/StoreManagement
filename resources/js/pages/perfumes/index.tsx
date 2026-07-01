import { Head, Link } from '@inertiajs/react';
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

interface PageProps {
    perfumes: Perfume[];
}

export default function PerfumesIndex({ perfumes }: PageProps) {
    const { t } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('perfume.browse'), href: '/perfumes' },
    ];
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const stats = {
        total: perfumes.length,
        men: perfumes.filter((p) =>
            Object.values(p.gender ?? {}).some((v) => /erkek|male|ذكر/i.test(v))
        ).length,
        women: perfumes.filter((p) =>
            Object.values(p.gender ?? {}).some((v) => /kadın|female|أنثى/i.test(v))
        ).length,
        niche: perfumes.filter((p) =>
            Object.values(p.gender ?? {}).some((v) => /unisex|uniseks|للجنسين/i.test(v))
        ).length,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('perfume.browse')} />
            <div className="container mx-auto space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('perfume.browse')}</h1>
                        <p className="text-muted-foreground">{t('perfume.browse.desc')}</p>
                    </div>
                    <Link href={route('perfumes.manage')}>
                        <Button>{t('perfume.add_btn')}</Button>
                    </Link>
                </div>

                <PerfumeFilters
                    search={search}
                    onSearchChange={setSearch}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.total}</p>
                            <p className="text-muted-foreground">{t('perfume.total_count')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.men}</p>
                            <p className="text-muted-foreground">{t('perfume.men_count')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.women}</p>
                            <p className="text-muted-foreground">{t('perfume.women_count')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-3xl font-bold">{stats.niche}</p>
                            <p className="text-muted-foreground">{t('perfume.niche_count')}</p>
                        </CardContent>
                    </Card>
                </div>

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
