import { Head, Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import PublicLayout from '@/layouts/PublicLayout';
import type { ReactNode } from 'react';

interface WelcomeProps {
    stores?: Array<{ id: number; name: string; slug: string; logo?: string }>;
}

function Welcome({ stores = [] }: WelcomeProps) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('Welcome')} />

            <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('Store Management')}</h1>
                <p className="text-lg text-gray-600 mb-8">{t('Manage your stores and products')}</p>

                {stores.length > 0 && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('Your Stores')}</h2>
                        <div className="grid gap-4">
                            {stores.map(store => (
                                <Link
                                    key={store.id}
                                    href={"/" + store.slug + "/dashboard"}
                                    className="block bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        {store.logo && (
                                            <img src={store.logo} alt={store.name} className="w-12 h-12 rounded-full object-cover" />
                                        )}
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">{store.name}</h3>
                                            <p className="text-sm text-gray-500">{t('Go to dashboard')}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

Welcome.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;

export default Welcome;
