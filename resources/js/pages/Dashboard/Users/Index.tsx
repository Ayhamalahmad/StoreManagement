import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UserData {
    id: number;
    name: string;
    email: string;
    is_super_admin: boolean;
    store_id: number | null;
    store?: { id: number; name: string } | null;
}

function Index() {
    const { t } = useTranslation();
    const { users, isSuperAdmin } = usePage<{ [key: string]: unknown; users: UserData[] | { data: UserData[] }; isSuperAdmin: boolean }>().props;

    const userList = Array.isArray(users) ? users : (users as { data: UserData[] }).data || [];

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(t('Delete user') + ' "' + name + '"?')) {
            router.delete('/dashboard/users/' + id);
        }
    };

    return (
        <>
            <Head title={t('Users')} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{t('Users')}</h1>
                    <Button asChild>
                        <Link href="/dashboard/users/create">{t('Add User')}</Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('Name')}</TableHead>
                                <TableHead>{t('Email')}</TableHead>
                                <TableHead>{t('Role')}</TableHead>
                                {isSuperAdmin && <TableHead>{t('Store')}</TableHead>}
                                <TableHead className="text-right">{t('Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userList.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.is_super_admin ? 'default' : 'secondary'}>
                                            {user.is_super_admin ? t('Super Admin') : t('Store Admin')}
                                        </Badge>
                                    </TableCell>
                                    {isSuperAdmin && (
                                        <TableCell>{user.store?.name || '-'}</TableCell>
                                    )}
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="default" size="sm" onClick={() => router.get('/dashboard/users/' + user.id + '/edit')}>
                                            {t('Edit')}
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, user.name)}>
                                            {t('Delete')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Users', href: '/dashboard/users' }]}>{page}</DashboardLayout>;

export default Index;
