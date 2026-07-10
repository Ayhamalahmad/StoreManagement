import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StoreIndexPageProps {
    [key: string]: unknown;
    store: {
        id: number;
        name: string;
        slug: string;
        description?: string;
        logo?: string;
    };
    isSuperAdmin: boolean;
    stats: {
        total_products: number;
    };
}

function StoreIndex() {
    const { t } = useTranslation();
    const { store, stats } = usePage<StoreIndexPageProps>().props;

    return (
        <>
            <Head title={store.name + ' ' + t('Dashboard')} />

            <div className="space-y-6">
                {store.logo && (
                    <img src={store.logo} alt={store.name} className="w-16 h-16 rounded-full object-cover" />
                )}
                <h1 className="text-2xl font-bold">{store.name} {t('Dashboard')}</h1>
                {store.description && (
                    <p className="text-muted-foreground">{store.description}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Products')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{stats.total_products}</p>
                            <p className="text-sm text-muted-foreground">{t('Total products')}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Manage')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link
                                href={'/' + store.slug + '/dashboard/products'}
                                className="text-sm text-primary hover:underline"
                            >
                                {t('Manage Products →')}
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Store')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link
                                href={'/' + store.slug}
                                className="text-sm text-primary hover:underline"
                            >
                                {t('View Store Front →')}
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

StoreIndex.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default StoreIndex;
