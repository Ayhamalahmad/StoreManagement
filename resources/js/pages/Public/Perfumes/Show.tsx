import { Head, Link } from '@inertiajs/react';
import { useProduct } from '@/features/Dashboard/Products';
import type { ProductPageProps } from '@/features/Dashboard/Products';
import PublicLayout from '@/layouts/PublicLayout';
import type { ReactNode } from 'react';

function Show({ product: initialProduct }: ProductPageProps) {
    const { data: perfume, isLoading, isError } = useProduct(initialProduct.code);
    const product = perfume ?? initialProduct;

    if (isLoading && !product) return <p className="text-gray-500">Loading...</p>;
    if (isError && !product) return <p className="text-red-500">Perfume not found.</p>;
    if (!product) return null;

    return (
        <>
            <Head title={product.name} />

            <div className="max-w-4xl mx-auto">
                <Link href="/perfumes" className="text-blue-600 hover:underline text-sm">
                    &larr; Back to search
                </Link>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                            {product.perfume_image_full ? (
                                <img src={product.perfume_image_full} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>
                        {product.inspired_image_full && (
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Inspired By Original</p>
                                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                    <img src={product.inspired_image_full} alt="Original" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-500 font-mono">{product.code}</p>
                            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-lg text-gray-600">{product.brand}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{product.gender}</span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{product.category}</span>
                            <span className={'px-3 py-1 rounded-full text-sm ' + (product.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                                {product.is_available ? 'Available' : 'Out of Stock'}
                            </span>
                        </div>

                        {product.inspired_by && (
                            <p className="text-sm text-gray-600">Inspired By: <span className="font-medium">{product.inspired_by}</span></p>
                        )}

                        <div className="space-y-2">
                            <h2 className="font-semibold text-gray-900">Location</h2>
                            <p className="text-sm text-gray-600">Section {product.section_number} &mdash; Shelf {product.shelf_number}</p>
                        </div>

                        {product.description && <p className="text-gray-700">{product.description}</p>}

                        <div className="space-y-3">
                            {product.top_notes && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Top Notes</h3>
                                    <p className="text-sm text-gray-600">{product.top_notes}</p>
                                </div>
                            )}
                            {product.middle_notes && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Middle Notes</h3>
                                    <p className="text-sm text-gray-600">{product.middle_notes}</p>
                                </div>
                            )}
                            {product.base_notes && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Base Notes</h3>
                                    <p className="text-sm text-gray-600">{product.base_notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;

export default Show;