import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useLanguage } from '@/hooks/use-language';
import { ArrowLeft, Package, Building2, User, Warehouse, DollarSign, Droplets, FlaskConical, Truck } from 'lucide-react';
import type { Oil } from '@/features/Oils/types';

interface PageProps {
    oil: Oil;
}

export default function OilShow({ oil }: PageProps) {
    const { t, locale } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('oil.browse'), href: '/oils' },
        { title: oil.name?.[locale] ?? oil.code, href: `/oils/${oil.id}` },
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
            <Head title={oil.name?.[locale] ?? oil.code} />
            <div className="container mx-auto space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <Link href={route('oils.index')}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{oil.name?.[locale] ?? oil.code}</h1>
                        <p className="text-muted-foreground">{t('oil.view_details')}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6">
                                <div className="aspect-square rounded-lg bg-muted">
                                    <img
                                        src={oil.image_url ?? '/placeholder.png'}
                                        alt={oil.name?.[locale] ?? ''}
                                        className="h-full w-full object-contain p-6"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <Badge variant="secondary" className="text-sm">
                                        {oil.code}
                                    </Badge>
                                    {oil.price != null && (
                                        <p className="mt-2 text-2xl font-bold">
                                            ${oil.price}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('oil.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DetailRow label={t('field.name')} value={oil.name?.[locale] ?? '-'} />
                                <DetailRow label={t('field.code')} value={oil.code} />
                                <DetailRow label={t('field.category')} value={oil.category?.[locale] ?? null} />
                                <DetailRow label={t('field.brand')} value={oil.brand ?? null} />
                                <DetailRow label={t('field.supplier')} value={oil.supplier ?? null} />
                            </CardContent>
                        </Card>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-4 w-4" /> {t('oil.shelf')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <DetailRow label={t('field.shelf')} value={oil.shelf} />
                                    <DetailRow label={t('field.section')} value={oil.section} />
                                    <DetailRow label={t('field.warehouse')} value={oil.warehouse} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" /> {t('oil.pricing')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <DetailRow label={t('field.price')} value={oil.price != null ? `$${oil.price}` : null} />
                                    <DetailRow label={t('field.volume')} value={oil.volume != null ? `${oil.volume} ml` : null} />
                                </CardContent>
                            </Card>
                        </div>

                        {oil.notes?.[locale] && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-4 w-4" /> {t('field.notes')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {oil.notes[locale]}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
