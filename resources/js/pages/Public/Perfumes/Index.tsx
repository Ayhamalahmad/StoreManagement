import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useProducts, ProductCard } from '@/features/Dashboard/Products';
import PublicLayout from '@/layouts/PublicLayout';
import type { ReactNode } from 'react';

interface SearchPageProps {
    perfumes?: any[];
    filters?: {
        search?: string;
        gender?: string;
        category?: string;
    };
}

function Index({ perfumes: initialData, filters: initialFilters }: SearchPageProps) {
    const [search, setSearch] = useState(initialFilters?.search ?? '');
    const [gender, setGender] = useState(initialFilters?.gender ?? '');
    const [category, setCategory] = useState(initialFilters?.category ?? '');

    const { data: perfumes, isLoading } = useProducts({
        search,
        gender,
        category,
        per_page: '50',
    });

    const effectivePerfumes = perfumes ?? initialData ?? [];

    return (
        <>
            <Head title="Find Your Perfume" />

            <div>
                <div className="mb-8 space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">Find Your Perfume</h1>
                    <div className="flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Search by code, name, brand, or notes..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="flex-1 min-w-[250px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select value={gender} onChange={e => setGender(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">All Genders</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="unisex">Unisex</option>
                        </select>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg">
                            <option value="">All Categories</option>
                            <option value="designer">Designer</option>
                            <option value="niche">Niche</option>
                            <option value="nishe">Nishe</option>
                        </select>
                    </div>
                </div>

                {isLoading && <p className="text-gray-500">Loading...</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {effectivePerfumes.map(perfume => (
                        <ProductCard key={perfume.id} product={perfume} />
                    ))}
                </div>

                {effectivePerfumes.length === 0 && !isLoading && (
                    <p className="text-gray-500 text-center py-12">No perfumes found. Try a different search.</p>
                )}
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;

export default Index;