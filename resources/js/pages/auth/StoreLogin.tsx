import { Head, useForm, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StoreLoginPageProps {
    [key: string]: unknown;
    store: {
        id: number;
        name: string;
        slug: string;
        logo?: string;
    };
}

export default function StoreLogin() {
    const { t, isRtl } = useTranslation();
    const { store } = usePage<StoreLoginPageProps>().props;
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '', remember: false });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/' + store.slug + '/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4" dir={isRtl ? 'rtl' : 'ltr'}>
            <Head title={store.name + ' Login'} />

            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    {store.logo && (
                        <img src={store.logo} alt={store.name} className="w-16 h-16 mx-auto mb-2 rounded-full object-cover" />
                    )}
                    <CardTitle className="text-2xl">{store.name}</CardTitle>
                    <CardDescription>{t('Sign in to manage your store')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('Email')}</Label>
                            <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} required autoFocus />
                            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">{t('Password')}</Label>
                            <Input id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} required />
                            {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                        </div>

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? t('Signing in...') : t('Sign in')}
                        </Button>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}
