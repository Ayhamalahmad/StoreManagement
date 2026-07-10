import { useState, FormEvent, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StoreOption {
    id: number;
    name: string;
}

interface EditUserData {
    id: number;
    name: string;
    email: string;
    is_super_admin: boolean;
    store_id: number | null;
    store?: { id: number; name: string } | null;
}

function Edit() {
    const { t } = useTranslation();
    const { editUser, stores, isSuperAdmin } = usePage<{ [key: string]: unknown; editUser: EditUserData; stores: StoreOption[] | null; isSuperAdmin: boolean }>().props;

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        store_id: '',
        is_super_admin: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (editUser) {
            setForm({
                name: editUser.name,
                email: editUser.email,
                password: '',
                password_confirmation: '',
                store_id: editUser.store_id ? String(editUser.store_id) : '',
                is_super_admin: editUser.is_super_admin,
            });
        }
    }, [editUser]);

    const update = (key: string, value: unknown) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const data: Record<string, unknown> = {
            name: form.name,
            email: form.email,
            is_super_admin: form.is_super_admin,
        };

        if (form.password) {
            data.password = form.password;
        }

        if (form.store_id) {
            data.store_id = Number(form.store_id);
        }

        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append('_method', 'PUT');

        router.post('/dashboard/users/' + editUser.id, fd, {
            onSuccess: () => setProcessing(false),
            onError: (err) => { setErrors(err as Record<string, string>); setProcessing(false); },
        });
    };

    return (
        <>
            <Head title={t('Edit') + ' ' + editUser.name} />

            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{t('Edit')}: {editUser.name}</h1>

                <form onSubmit={handleSubmit} className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('Name')}</Label>
                        <Input id="name" value={form.name} onChange={e => update('name', e.target.value)} required />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('Email')}</Label>
                        <Input id="email" type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t('Password')} <span className="text-xs text-muted-foreground">({t('Leave empty to keep current')})</span></Label>
                        <Input id="password" type="password" value={form.password} onChange={e => update('password', e.target.value)} />
                        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation">{t('Confirm Password')}</Label>
                        <Input id="password_confirmation" type="password" value={form.password_confirmation} onChange={e => update('password_confirmation', e.target.value)} />
                    </div>

                    {stores && stores.length > 0 && (
                        <div className="space-y-2">
                            <Label>{t('Store')}</Label>
                            <Select value={form.store_id} onValueChange={v => update('store_id', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('Select store')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {stores.map(s => (
                                        <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {isSuperAdmin && (
                        <div className="flex items-center gap-2">
                            <Checkbox id="is_super_admin" checked={form.is_super_admin} onCheckedChange={v => update('is_super_admin', v)} />
                            <Label htmlFor="is_super_admin">{t('Super Admin')}</Label>
                        </div>
                    )}

                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? t('Saving...') : t('Update User')}
                    </Button>
                </form>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Users', href: '/dashboard/users' }, { title: 'Edit', href: '' }]}>{page}</DashboardLayout>;

export default Edit;
