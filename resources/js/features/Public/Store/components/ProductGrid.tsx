import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import type { Perfume } from '@/lib/api';
import type { StoreData } from '../types/store.types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';

type GenderTab = 'men' | 'women' | 'unisex';

interface ProductGridProps {
    store: StoreData;
    products: Perfume[];
    isLoading?: boolean;
}

function useMountAnimation() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    return mounted;
}

export default function ProductGrid({ store, products, isLoading }: ProductGridProps) {
    const { t, isRtl } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('all');
    const mounted = useMountAnimation();

    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category));
        return Array.from(cats);
    }, [products]);

    const defaultTab: GenderTab = 'women';
    const [activeTab, setActiveTab] = useState<GenderTab>(defaultTab);

    const GENDER_TABS: { value: GenderTab; label: string }[] = [
        { value: 'men', label: t('Men') },
        { value: 'women', label: t('Women') },
        { value: 'unisex', label: t('Unisex') },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#1a1924] text-white p-6">
                <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
                    <div className="h-10 bg-[#232232] rounded-lg w-72" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-[#232232] rounded-xl h-64" />
                        <div className="md:col-span-3 grid grid-cols-3 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-[#232232] rounded-xl h-80" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const filteredProducts = products.filter(p => {
        const genderMatch = p.gender === activeTab;
        const categoryMatch = activeCategory === 'all' || p.category === activeCategory;
        return genderMatch && categoryMatch;
    });

    return (
        <div className="min-h-screen bg-[#1a1924]" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as GenderTab)} className="w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-[#3d3b54]/50">
                        <TabsList className="bg-[#232232] border border-[#3d3b54]/30 p-1 rounded-lg">
                            {GENDER_TABS.map(tab => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={cn(
                                        "text-sm text-gray-400 rounded-md px-4 py-1.5 transition-all duration-200",
                                        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff5722] data-[state=active]:to-[#ff8a50] data-[state=active]:text-white data-[state=active]:shadow-sm"
                                    )}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <h1 className="text-lg font-bold tracking-wider text-gray-300">{store.name}</h1>
                    </div>

                    {GENDER_TABS.map(genderTab => (
                        <TabsContent key={genderTab.value} value={genderTab.value} className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-3 lg:col-span-2">
                                    <div className="bg-[#232232]/50 backdrop-blur-sm p-4 rounded-xl border border-[#3d3b54]/30 sticky top-4">
                                        <h3 className="text-sm font-semibold text-[#ff5722] mb-3 border-b border-[#3d3b54]/30 pb-2">
                                            {t('All Categories')}
                                        </h3>
                                        <ul className="space-y-1 text-sm">
                                            <li>
                                                <button
                                                    onClick={() => setActiveCategory('all')}
                                                    className={cn(
                                                        "w-full text-left cursor-pointer transition-all duration-200 p-2 rounded-lg",
                                                        activeCategory === 'all'
                                                            ? 'text-white bg-[#ff5722]/10 font-medium'
                                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    )}
                                                >
                                                    {t('All Products')}
                                                </button>
                                            </li>
                                            {categories.map(cat => (
                                                <li key={cat}>
                                                    <button
                                                        onClick={() => setActiveCategory(cat)}
                                                        className={cn(
                                                            "w-full text-left cursor-pointer transition-all duration-200 p-2 rounded-lg",
                                                            activeCategory === cat
                                                                ? 'text-white bg-[#ff5722]/10 font-medium'
                                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                        )}
                                                    >
                                                        {cat === 'designer' ? t('Designer Perfumes') : cat === 'niche' ? t('Niche Perfumes') : t('Nishe Perfumes')}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="md:col-span-9 lg:col-span-10">
                                    {filteredProducts.length === 0 ? (
                                        <div className="text-center py-16 text-gray-500">
                                            <p className="text-lg">{t('No products in this section.')}</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                            {filteredProducts.map((product, index) => (
                                                <div
                                                    key={product.id}
                                                    className={cn(
                                                        "transition-all duration-500",
                                                        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                                    )}
                                                    style={{ transitionDelay: `${index * 60}ms` }}
                                                >
                                                    <ProductCard product={product} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
