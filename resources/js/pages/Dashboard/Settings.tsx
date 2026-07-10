import { useState, FormEvent, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StoreData {
    id: number;
    name: string;
    slug: string;
    description?: string;
    domain?: string;
    logo?: string;
    is_active: boolean;
}

function Settings() {
    const { t } = useTranslation();
    const { store } = usePage<{ [key: string]: unknown; store: StoreData | null }>().props;

    const [form, setForm] = useState({
        name: '',
        description: '',
        logo: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (store) {
            setForm({
                name: store.name,
                description: store.description || '',
                logo: store.logo || '',
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
        Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
        fd.append('_method', 'PUT');
        router.post('/dashboard/settings', fd, {
            onSuccess: () => setProcessing(false),
            onError: (err) => { setErrors(err as Record<string, string>); setProcessing(false); },
        });
    };

    if (!store) {
        return (
            <>
                <Head title={t('Settings')} />
                <div className="text-center py-12 text-muted-foreground">
                    {t('No store assigned')}
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={t('Settings')} />

            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{t('Store Settings')}</h1>

                <div className="text-sm text-muted-foreground">
                    {t('Store')}: <strong>{store.name}</strong> | {t('Slug')}: <strong>{store.slug}</strong>
                    {store.domain && <> | {t('Domain')}: <strong>{store.domain}</strong></>}
                </div>

                <form onSubmit={handleSubmit} className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('Store Name')}</Label>
                        <Input id="name" value={form.name} onChange={e => update('name', e.target.value)} required />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">{t('Description')}</Label>
                        <Textarea id="description" value={form.description} onChange={e => update('description', e.target.value)} rows={4} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="logo">{t('Logo URL')}</Label>
                        <Input id="logo" value={form.logo} onChange={e => update('logo', e.target.value)} />
                        {form.logo && (
                            <img src={form.logo} alt={t('Logo')} className="w-16 h-16 object-cover mt-2 rounded" />
                        )}
                    </div>

                    <Button type="submit" disabled={processing} className="w-full">
                        {processing ? t('Saving...') : t('Save Settings')}
                    </Button>
                </form>
            </div>
        </>
    );
}

Settings.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Settings', href: '/dashboard/settings' }]}>{page}</DashboardLayout>;

export default Settings;
