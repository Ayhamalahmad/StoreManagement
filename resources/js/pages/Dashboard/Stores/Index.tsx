import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface StoreData {
    id: number;
    name: string;
    slug: string;
    description?: string;
    domain?: string;
    logo?: string;
    is_active: boolean;
    perfumes_count?: number;
    users_count?: number;
}

function Index() {
    const { t } = useTranslation();
    const { stores, isSuperAdmin } = usePage<{ [key: string]: unknown; stores: StoreData[] | { data: StoreData[] }; isSuperAdmin: boolean }>().props;

    const storeList = Array.isArray(stores) ? stores : (stores as { data: StoreData[] }).data || [];

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(t('Delete store') + ' "' + name + '"?')) {
            router.delete('/dashboard/stores/' + id);
        }
    };

    return (
        <>
            <Head title={t('Stores')} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{t('Stores')}</h1>
                    {isSuperAdmin && (
                        <Button asChild>
                            <Link href="/dashboard/stores/create">{t('Add Store')}</Link>
                        </Button>
                    )}
                </div>

                <div className="overflow-hidden rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('Name')}</TableHead>
                                {isSuperAdmin && <TableHead>{t('Slug')}</TableHead>}
                                <TableHead>{t('Status')}</TableHead>
                                <TableHead>{t('Products')}</TableHead>
                                <TableHead>{t('Users')}</TableHead>
                                {isSuperAdmin && <TableHead className="text-right">{t('Actions')}</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {storeList.map(store => (
                                <TableRow key={store.id}>
                                    <TableCell className="font-medium">{store.name}</TableCell>
                                    {isSuperAdmin && <TableCell className="font-mono text-xs">{store.slug}</TableCell>}
                                    <TableCell>
                                        <Badge variant={store.is_active ? 'default' : 'destructive'}>
                                            {store.is_active ? t('Active') : t('Inactive')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{store.perfumes_count ?? '-'}</TableCell>
                                    <TableCell>{store.users_count ?? '-'}</TableCell>
                                    {isSuperAdmin && (
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="default" size="sm" onClick={() => router.get('/dashboard/stores/' + store.id + '/edit')}>
                                                {t('Edit')}
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(store.id, store.name)}>
                                                {t('Delete')}
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Stores', href: '/dashboard/stores' }]}>{page}</DashboardLayout>;

export default Index;
