import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Package, Users, Activity } from 'lucide-react';

interface DashboardStats {
    total_products: number;
    total_stores?: number;
    total_users?: number;
    active_stores?: number;
}

function Index() {
    const { t } = useTranslation();
    const { auth, stats, isSuperAdmin, store } = usePage<{
        [key: string]: unknown;
        auth: { user: { name: string } | null };
        stats: DashboardStats;
        isSuperAdmin: boolean;
        store: { id: number; name: string; slug: string } | null;
    }>().props;
    const user = auth?.user;

    return (
        <>
            <Head title={t('Dashboard')} />

            <div className="space-y-6">
                <h1 className="text-2xl font-bold">{t('Welcome')}, {user?.name ?? t('Admin')}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{t('Total Products')}</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{stats.total_products}</p>
                        </CardContent>
                    </Card>

                    {isSuperAdmin && (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{t('Total Stores')}</CardTitle>
                                    <Store className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{stats.total_stores}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{t('Active Stores')}</CardTitle>
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{stats.active_stores}</p>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{t('Total Users')}</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{stats.total_users ?? 0}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {isSuperAdmin && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Stores')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{t('Manage all stores')}</p>
                                <Link href="/dashboard/stores" className="text-sm text-primary hover:underline">
                                    {t('Manage Stores →')}
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Products')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('Manage your products')}</p>
                            <Link href="/dashboard/products" className="text-sm text-primary hover:underline">
                                {t('Manage Products →')}
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Users')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('Manage users')}</p>
                            <Link href="/dashboard/users" className="text-sm text-primary hover:underline">
                                {t('Manage Users →')}
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('Settings')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{t('Store settings')}</p>
                            <Link href="/dashboard/settings" className="text-sm text-primary hover:underline">
                                {t('Settings →')}
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Index;
