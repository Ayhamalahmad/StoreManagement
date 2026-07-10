import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/use-language';
import { Building2, Package, User, Eye } from 'lucide-react';
import type { Perfume } from '../types';

interface Props {
    perfume: Perfume;
    onViewDetails?: (perfume: Perfume) => void;
}

export function PerfumeCard({ perfume, onViewDetails }: Props) {
    const { t, locale } = useLanguage();

    return (
        <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-square bg-muted">
                <img
                    src={perfume.image_url}
                    alt={perfume.name?.[locale] ?? ''}
                    className="h-full w-full object-contain p-6"
                />
            </div>

            <CardContent className="space-y-4 p-4">
                <div>
                    <h3 className="line-clamp-1 font-semibold">
                        {perfume.name?.[locale] ?? perfume.code}
                    </h3>
                    <Badge className="mt-2" variant="secondary">
                        {perfume.code}
                    </Badge>
                </div>

                <div className="space-y-2 text-sm">
                    {perfume.fragrance_categories?.length > 0 && (
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {perfume.fragrance_categories.map((c) => c.name?.[locale]).filter(Boolean).join(', ') || '-'}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {perfume.section ?? '-'}
                    </div>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {perfume.shelf ?? '-'}
                    </div>
                </div>

                {perfume.seasons?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {perfume.seasons.map((s) => (
                            <Badge key={s.id} variant="secondary">
                                {s.name?.[locale] ?? s.slug}
                            </Badge>
                        ))}
                    </div>
                )}

                {perfume.family?.[locale] && (
                    <p className="text-muted-foreground text-sm">
                        {perfume.family[locale]}
                    </p>
                )}

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewDetails?.(perfume)}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    {t('perfume.view_details')}
                </Button>
            </CardContent>
        </Card>
    );
}
