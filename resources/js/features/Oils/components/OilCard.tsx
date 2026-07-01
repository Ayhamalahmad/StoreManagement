import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/use-language';
import { Building2, Package, User, Eye, FlaskConical, Droplets } from 'lucide-react';
import type { Oil } from '../types';

interface Props {
    oil: Oil;
    onViewDetails?: (oil: Oil) => void;
}

export function OilCard({ oil, onViewDetails }: Props) {
    const { t, locale } = useLanguage();

    return (
        <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="aspect-square bg-muted">
                <img
                    src={oil.image_url ?? '/placeholder.png'}
                    alt={oil.name?.[locale] ?? ''}
                    className="h-full w-full object-contain p-6"
                />
            </div>

            <CardContent className="space-y-4 p-4">
                <div>
                    <h3 className="line-clamp-1 font-semibold">
                        {oil.name?.[locale] ?? oil.code}
                    </h3>
                    <Badge className="mt-2" variant="secondary">
                        {oil.code}
                    </Badge>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <FlaskConical className="h-4 w-4" />
                        {oil.category?.[locale] ?? '-'}
                    </div>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {oil.section ?? '-'}
                    </div>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {oil.shelf ?? '-'}
                    </div>
                </div>

                {oil.volume != null && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Droplets className="h-4 w-4" />
                        {oil.volume} ml
                    </div>
                )}

                {oil.brand && (
                    <p className="text-muted-foreground text-sm">
                        {oil.brand}
                    </p>
                )}

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onViewDetails?.(oil)}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    {t('oil.view_details')}
                </Button>
            </CardContent>
        </Card>
    );
}
