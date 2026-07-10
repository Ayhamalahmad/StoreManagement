import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';

interface Stats {
    total: number;
    men: number;
    women: number;
    niche: number;
}

interface Props {
    stats: Stats;
}

export function PerfumeStats({ stats }: Props) {
    const { t } = useLanguage();

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
