import { useState, useMemo } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { ProductList } from '@/features/Dashboard/Products';
import type { ProductsPageProps, ProductData } from '@/features/Dashboard/Products';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Filters {
    search?: string;
    gender?: string;
    category?: string;
    is_available?: string;
}

function Index({ products: productsProp, filters: initialFilters }: ProductsPageProps) {
    const { t } = useTranslation();
    const { currentStore } = usePage<{ [key: string]: unknown; currentStore?: { id: number; name: string; slug: string } | null }>().props;
    const base = currentStore ? '/' + currentStore.slug + '/dashboard' : '/dashboard';

    const products = useMemo(() => {
        return Array.isArray(productsProp) ? productsProp : (productsProp as any)?.data ?? [];
    }, [productsProp]);

    const [search, setSearch] = useState(initialFilters?.search || '');
    const [gender, setGender] = useState(initialFilters?.gender || '');
    const [category, setCategory] = useState(initialFilters?.category || '');
    const [isAvailable, setIsAvailable] = useState(initialFilters?.is_available || '');

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (gender) params.set('gender', gender);
        if (category) params.set('category', category);
        if (isAvailable) params.set('is_available', isAvailable);
        const qs = params.toString();
        router.get(base + '/products' + (qs ? '?' + qs : ''));
    };

    const clearFilters = () => {
        setSearch('');
        setGender('');
        setCategory('');
        setIsAvailable('');
        router.get(base + '/products');
    };

    const hasFilters = search || gender || category || isAvailable;

    return (
        <>
            <Head title={t('Products')} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{t('Products')}</h1>
                    <Button asChild>
                        <Link href={base + '/products/create'}>{t('Create')}</Link>
                    </Button>
                </div>

                <div className="bg-card rounded-xl border p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="space-y-1">
                            <Label className="text-xs">{t('Search')}</Label>
                            <Input
                                placeholder={t('Search products...')}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && applyFilters()}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">{t('Gender')}</Label>
                            <Select value={gender} onValueChange={setGender}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('All')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">{t('All')}</SelectItem>
                                    <SelectItem value="men">{t('Men')}</SelectItem>
                                    <SelectItem value="women">{t('Women')}</SelectItem>
                                    <SelectItem value="unisex">{t('Unisex')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">{t('Category')}</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('All')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">{t('All')}</SelectItem>
                                    <SelectItem value="designer">{t('Designer')}</SelectItem>
                                    <SelectItem value="niche">{t('Niche')}</SelectItem>
                                    <SelectItem value="nishe">{t('Nishe')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">{t('Availability')}</Label>
                            <Select value={isAvailable} onValueChange={setIsAvailable}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('All')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">{t('All')}</SelectItem>
                                    <SelectItem value="1">{t('Available')}</SelectItem>
                                    <SelectItem value="0">{t('Out of Stock')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end gap-2">
                            <Button onClick={applyFilters} className="flex-1">{t('Filter')}</Button>
                            {hasFilters && (
                                <Button variant="outline" onClick={clearFilters}>{t('Clear')}</Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border">
                    <ProductList products={products} />
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Products', href: '/dashboard/products' }]}>{page}</DashboardLayout>;

export default Index;
