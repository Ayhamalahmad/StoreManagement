import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { ProductForm } from '@/features/Dashboard/Products';
import DashboardLayout from '@/layouts/DashboardLayout';

function Create() {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('Add Product')} />

            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{t('Add Product')}</h1>
                <ProductForm />
            </div>
        </>
    );
}

Create.layout = (page: React.ReactNode) => <DashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Products', href: '/dashboard/products' }, { title: 'Add Product', href: '/dashboard/products/create' }]}>{page}</DashboardLayout>;

export default Create;
