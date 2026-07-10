import { useState } from 'react';
import type { Perfume } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Sparkles } from 'lucide-react';

interface ProductCardProps {
    product: Perfume;
    dir?: 'ltr' | 'rtl';
}

function formatLocation(section: number, shelf: number) {
    return {
        section: `القسم ${section}`,
        shelf: `الرف ${shelf}`,
    };
}

function formatIngredients(product: Perfume) {
    return [product.top_notes, product.middle_notes, product.base_notes]
        .filter(Boolean)
        .join('، ');
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const loc = formatLocation(product.section_number, product.shelf_number);
    const ingredients = formatIngredients(product);

    return (
        <Card
            className="group bg-[#232232] border-[#3d3b54] text-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#ff5722]/40 hover:shadow-lg hover:shadow-[#ff5722]/5 hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 flex items-center justify-center p-4 overflow-hidden">
                {product.perfume_image_full ? (
                    <>
                        <img
                            src={product.perfume_image_full}
                            alt={product.name}
                            className={`w-full h-full object-contain transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-[#232232]/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <Sparkles className="w-8 h-8" />
                        <span className="text-xs">{product.name}</span>
                    </div>
                )}
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base font-bold text-gray-100 leading-tight line-clamp-2">
                        {product.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-[#ff5722]/40 text-[#ff5722] bg-[#ff5722]/5 text-xs shrink-0">
                        {product.code}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-[#1a1924] text-gray-300 px-2.5 py-1 rounded-md flex items-center gap-1 border border-[#3d3b54]/30">
                        {loc.section}
                    </span>
                    <span className="bg-gradient-to-r from-[#ff5722] to-[#ff8a50] text-white px-2.5 py-1 rounded-md font-bold shadow-sm">
                        {loc.shelf}
                    </span>
                </div>

                {ingredients && (
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-white pt-2 border-t border-[#3d3b54]/30 transition-colors">
                            <span>تركيبة العطر والمكونات</span>
                            <ChevronDown
                                className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? 'rotate-180 text-[#ff5722]' : ''}`}
                            />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="text-xs text-gray-400 mt-2 bg-[#1a1924]/80 p-2.5 rounded-lg border border-[#3d3b54]/20 leading-relaxed">
                            {ingredients}
                        </CollapsibleContent>
                    </Collapsible>
                )}
            </CardContent>
        </Card>
    );
}
