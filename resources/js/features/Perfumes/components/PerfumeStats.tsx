import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import type { Perfume } from '../types';

interface Props {
    perfumes: Perfume[];
}

export function PerfumeStats({ perfumes }: Props) {
    const { t } = useLanguage();

    const stats = {
        total: perfumes.length,
        men: perfumes.filter((p) =>
            p.fragrance_categories?.some((c) => /erkek|male|ذكر/i.test(c.slug ?? '') || /erkek|male|ذكر/i.test(Object.values(c.name ?? {}).join(' ')))
        ).length,
        women: perfumes.filter((p) =>
            p.fragrance_categories?.some((c) => /kadin|female|أنثى/i.test(c.slug ?? '') || /kadın|female|أنثى/i.test(Object.values(c.name ?? {}).join(' ')))
        ).length,
        niche: perfumes.filter((p) =>
            p.fragrance_categories?.some((c) => c.type === 'niche')
        ).length,
    };

    return (
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.total}</p>
                    <p className="text-muted-foreground">{t('perfume.total')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.men}</p>
                    <p className="text-muted-foreground">{t('gender.male')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.women}</p>
                    <p className="text-muted-foreground">{t('gender.female')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.niche}</p>
                    <p className="text-muted-foreground">{t('gender.unisex')}</p>
                </CardContent>
            </Card>
        </div>
    );
}
