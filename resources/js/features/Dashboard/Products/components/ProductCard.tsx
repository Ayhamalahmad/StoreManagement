import { Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import type { ProductData } from '../types/products.types';

interface ProductCardProps {
    product: ProductData;
}

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function ProductCard({ product }: ProductCardProps) {
    const { t } = useTranslation();

    return (
        <Link
            href={"/perfumes/" + product.code}
            className="block bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
        >
            <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                {product.perfume_image ? (
                    <img src={product.perfume_image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">{t('No Image')}</div>
                )}
            </div>
            <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500 font-mono">{product.code}</p>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{t(capitalize(product.gender))}</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{t(capitalize(product.category))}</span>
                    <span className={'px-2 py-1 rounded ' + (product.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                        {product.is_available ? t('Available') : t('Out of Stock')}
                    </span>
                </div>
                <p className="text-xs text-gray-500">{t('Section')} {product.section_number} / {t('Shelf')} {product.shelf_number}</p>
            </div>
        </Link>
    );
}