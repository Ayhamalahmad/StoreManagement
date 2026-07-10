import { Head, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { useState, useMemo } from 'react';
import { ProductGrid } from '@/features/Public/Store';
import type { StorePageProps } from '@/features/Public/Store';

function Show({ store, products, filters = {}, sections = [], shelves = [] }: StorePageProps) {
    const { t, isRtl } = useTranslation();
    const [searchType, setSearchType] = useState<'all' | 'code' | 'brand'>('all');
    const [searchValue, setSearchValue] = useState(filters.search ?? '');
    const [activeSection, setActiveSection] = useState(filters.section_number ?? '');
    const [activeShelf, setActiveShelf] = useState(filters.shelf_number ?? '');

    const searchPlaceholder = searchType === 'code' ? t('Search by code...') : searchType === 'brand' ? t('Search by brand...') : t('Search by code, brand, name, or notes');

    const handleSearch = () => {
        router.reload({
            data: {
                search: searchValue || undefined,
                search_type: searchType,
                section_number: activeSection || undefined,
                shelf_number: activeShelf || undefined,
            },
            preserveUrl: true,
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const productsList = useMemo(() => {
        return Array.isArray(products) ? products : (products as any)?.data ?? [];
    }, [products]);

    return (
        <div dir={isRtl ? 'rtl' : 'ltr'}>
            <Head title={store.name} />

            {/* Search Bar */}
            <div className="bg-[#1a1924] pt-6 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex bg-[#232232] rounded-lg border border-[#3d3b54] overflow-hidden">
                            {(['all', 'code', 'brand'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSearchType(type)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                                        searchType === type
                                            ? 'bg-[#ff5722] text-white'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {type === 'all' ? t('All') : type === 'code' ? t('Code') : t('Brand')}
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={searchPlaceholder}
                                    className="w-full px-4 py-2 bg-[#232232] border border-[#3d3b54] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5722]"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="px-6 py-2 bg-[#ff5722] text-white rounded-lg hover:bg-[#e64a19] transition-colors font-medium"
                                >
                                    {t('Search')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sections & Shelves */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {sections.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-400 ml-2">{t('Section')}:</span>
                                <button
                                    onClick={() => { setActiveSection(''); handleSearch(); }}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                        activeSection === ''
                                            ? 'bg-[#ff5722] text-white'
                                            : 'bg-[#232232] text-gray-400 hover:text-white border border-[#3d3b54]'
                                    }`}
                                >
                                    {t('All')}
                                </button>
                                {sections.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => { setActiveSection(String(s)); handleSearch(); }}
                                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                            activeSection === String(s)
                                                ? 'bg-[#ff5722] text-white'
                                                : 'bg-[#232232] text-gray-400 hover:text-white border border-[#3d3b54]'
                                        }`}
                                    >
                                        {t('Section')} {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {shelves.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-400 ml-2">{t('Shelf')}:</span>
                                <button
                                    onClick={() => { setActiveShelf(''); handleSearch(); }}
                                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                        activeShelf === ''
                                            ? 'bg-[#ff5722] text-white'
                                            : 'bg-[#232232] text-gray-400 hover:text-white border border-[#3d3b54]'
                                    }`}
                                >
                                    {t('All')}
                                </button>
                                {shelves.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => { setActiveShelf(String(s)); handleSearch(); }}
                                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                            activeShelf === String(s)
                                                ? 'bg-[#ff5722] text-white'
                                                : 'bg-[#232232] text-gray-400 hover:text-white border border-[#3d3b54]'
                                        }`}
                                    >
                                        {t('Shelf')} {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProductGrid store={store} products={productsList as any} />
        </div>
    );
}

export default Show;
