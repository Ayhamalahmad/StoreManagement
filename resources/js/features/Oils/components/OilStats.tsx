import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import type { Oil } from '../types';

interface Props {
    oils: Oil[];
}

export function OilStats({ oils }: Props) {
    const { t } = useLanguage();

    const stats = {
        total: oils.length,
        essential: oils.filter((o) =>
            Object.values(o.category ?? {}).some((v) => /essential|esansiyel|عطري/i.test(v))
        ).length,
        fragrance: oils.filter((o) =>
            Object.values(o.category ?? {}).some((v) => /fragrance|koku|عطر/i.test(v))
        ).length,
        carrier: oils.filter((o) =>
            Object.values(o.category ?? {}).some((v) => /carrier|taşıyıcı|ناقل/i.test(v))
        ).length,
    };

    return (
        <div className="grid gap-4 md:grid-cols-4">
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.total}</p>
                    <p className="text-muted-foreground">{t('oil.total')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.essential}</p>
                    <p className="text-muted-foreground">{t('oil.essential')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.fragrance}</p>
                    <p className="text-muted-foreground">{t('oil.fragrance')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <p className="text-3xl font-bold">{stats.carrier}</p>
                    <p className="text-muted-foreground">{t('oil.carrier')}</p>
                </CardContent>
            </Card>
        </div>
    );
}
