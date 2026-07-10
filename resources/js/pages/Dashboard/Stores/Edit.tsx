import { useState, FormEvent, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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

function Edit() {
    const { t } = useTranslation();
    const { store } = usePage<{ [key: string]: unknown; store: StoreData }>().props;

    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        domain: '',
        logo: '',
        is_active: true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (store) {
            setForm({
                name: store.name,
                slug: store.slug,
                description: store.description || '',
                domain: store.domain || '',
                logo: store.logo || '',
                is_active: store.is_active,
            });
        }
    }, [store]);

    const update = (key: string, value: unknown) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            fd.append(k, String(v));
        });
        fd.append('_method', 'PUT');

        router.post('/dashboard/stores/' + store.id, fd, {
            onSuccess: () => setProcessing(false),
            onError: (err) => { setErrors(err as Record<string, string>); setProcessing(false); },
        });
    };

    return (
        <>
            <Head title={t('Edit') + ' ' + store.name} />

            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{t('Edit')}: {store.name}</h1>

                {store.perfumes_count !== undefined && (
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{t('Products')}: {store.perfumes_count}</span>
                        <span>{t('Users')}: {store.users_count}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('Name')}</Label>
                        <Input id="name" value={form.name} onChange={e => update('name', e.target.value)} required />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">{t('Slug')}</Label>
                        <Input id="slug" value={form.slug} onChange={e => update('slug', e.target.value)} required />
                        {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">{t('Description')}</Label>
                        <Textarea id="description" value={form.description} onChange={e => update('description', e.target.value)} rows={3} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="domain">{t('Domain')}</Label>
                        <Input id="domain" value={form.domain} onChange={e => update('domain', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="logo">{t('Logo URL')}</Label>
                        <Input id="logo" value={form.logo} onChange={e => update('logo', e.target.value)} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="is_active" checked={form.is_active} onCheckedChange={v => update('is_active', v)} />
                        <Label htmlFor="is_active">{t('Active')}</Label>
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? t('Saving...') : t('Update Store')}
                    </Button>
                </form>
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Stores', href: '/dashboard/stores' }, { title: 'Edit', href: '' }]}>{page}</DashboardLayout>;

export default Edit;
