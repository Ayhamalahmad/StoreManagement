import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { ProductForm } from '@/features/Dashboard/Products';
import type { ProductPageProps } from '@/features/Dashboard/Products';
import DashboardLayout from '@/layouts/DashboardLayout';

function Edit({ product }: ProductPageProps) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('Edit') + ' ' + product.name} />

            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{t('Edit')}: {product.name}</h1>
                <ProductForm product={product} isEdit={true} />
            </div>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Products', href: '/dashboard/products' }, { title: 'Edit', href: '' }]}>{page}</DashboardLayout>;

export default Edit;
