import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useLanguage } from '@/hooks/use-language';
import { ArrowLeft, Package, Building2, User, Warehouse, DollarSign } from 'lucide-react';
import type { Perfume } from '@/features/Perfumes/types';

interface PageProps {
    perfume: Perfume;
}

export default function PerfumeShow({ perfume }: PageProps) {
    const { t, locale } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('perfume.browse'), href: '/perfumes' },
        { title: perfume.name?.[locale] ?? perfume.code, href: `/perfumes/${perfume.id}` },
    ];

    const DetailRow = ({ label, value }: { label: string; value: string | null }) => (
        value ? (
            <div className="flex justify-between border-b py-2">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
            </div>
        ) : null
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={perfume.name?.[locale] ?? perfume.code} />
            <div className="container mx-auto space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('perfumes.index')}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{perfume.name?.[locale] ?? perfume.code}</h1>
                        <p className="text-muted-foreground">{t('perfume.view_details')}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="aspect-square rounded-lg bg-muted">
                                    <img
                                        src={perfume.image_url}
                                        alt={perfume.name?.[locale] ?? ''}
                                        className="h-full w-full object-contain p-6"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <Badge variant="secondary" className="text-sm">
                                        {perfume.code}
                                    </Badge>
                                    {perfume.price != null && (
                                        <p className="mt-2 text-2xl font-bold">
                                            ${perfume.price}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('perfume.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DetailRow label={t('field.name')} value={perfume.name?.[locale] ?? '-'} />
                                <DetailRow label={t('field.code')} value={perfume.code} />
                                <DetailRow label={t('field.original_perfume')} value={perfume.original_perfume?.[locale] ?? null} />
                                <DetailRow label={t('field.fragrance_categories')} value={perfume.fragrance_categories?.map((c) => c.name?.[locale]).filter(Boolean).join(', ') ?? null} />
                                <DetailRow label={t('field.family')} value={perfume.family?.[locale] ?? null} />
                                <DetailRow label={t('field.seasons')} value={perfume.seasons?.map((s) => s.name?.[locale]).filter(Boolean).join(', ') ?? null} />
                                <DetailRow label={t('field.concentration')} value={perfume.concentration?.[locale] ?? null} />
                                <DetailRow label={t('field.sillage')} value={perfume.sillage?.[locale] ?? null} />
                                <DetailRow label={t('field.sillage_levels')} value={perfume.sillage_levels?.map((l) => l.name?.[locale]).filter(Boolean).join(', ') ?? null} />
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-4 w-4" /> {t('perfume.shelf')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <DetailRow label={t('field.shelf')} value={perfume.shelf} />
                                    <DetailRow label={t('field.section')} value={perfume.section} />
                                    <DetailRow label={t('field.warehouse')} value={perfume.warehouse} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-4 w-4" /> {t('field.notes')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {perfume.notes?.[locale] ?? '-'}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {(perfume.top_notes || perfume.middle_notes || perfume.base_notes) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('field.top_notes')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        {perfume.top_notes && (
                                            <div>
                                                <h4 className="mb-1 text-sm font-medium text-muted-foreground">{t('field.top_notes')}</h4>
                                                <p>{perfume.top_notes[locale]}</p>
                                            </div>
                                        )}
                                        {perfume.middle_notes && (
                                            <div>
                                                <h4 className="mb-1 text-sm font-medium text-muted-foreground">{t('field.middle_notes')}</h4>
                                                <p>{perfume.middle_notes[locale]}</p>
                                            </div>
                                        )}
                                        {perfume.base_notes && (
                                            <div>
                                                <h4 className="mb-1 text-sm font-medium text-muted-foreground">{t('field.base_notes')}</h4>
                                                <p>{perfume.base_notes[locale]}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
