import { useState, FormEvent } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

function Create() {
    const { t } = useTranslation();
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

    const update = (key: string, value: unknown) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const generateSlug = (name: string) => {
        setForm(prev => ({ ...prev, name, slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/dashboard/stores', form, {
            onSuccess: () => setProcessing(false),
            onError: (err) => { setErrors(err as Record<string, string>); setProcessing(false); },
        });
    };

    return (
        <>
            <Head title={t('Add Store')} />

            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{t('Add Store')}</h1>

                <form onSubmit={handleSubmit} className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('Name')}</Label>
                        <Input id="name" value={form.name} onChange={e => generateSlug(e.target.value)} required />
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
                        {processing ? t('Saving...') : t('Create Store')}
                    </Button>
                </form>
            </div>
        </>
    );
}

Create.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Stores', href: '/dashboard/stores' }, { title: 'Add Store', href: '/dashboard/stores/create' }]}>{page}</DashboardLayout>;

export default Create;
