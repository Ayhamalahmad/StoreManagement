import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SeasonForm } from '@/features/Seasons';
import type { Season } from '@/features/Seasons/types';

interface PageProps {
    seasons: Season[];
}

export default function SeasonsManage() {
    const { seasons } = usePage<PageProps>().props;
    const { t, locale } = useLanguage();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingSeason, setEditingSeason] = useState<Season | null>(null);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('season.manage'), href: '/seasons' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('season.manage')} />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('season.manage')}</h1>
                        <p className="text-muted-foreground">{t('season.manage.desc')}</p>
                    </div>
                    <Button onClick={() => { setEditingSeason(null); setIsAddOpen(true); }}>
                        <Plus className="me-2 h-4 w-4" /> {t('season.add')}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('season.all')} ({seasons.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-start text-muted-foreground">
                                        <th className="px-4 py-3 font-medium">{t('field.name')}</th>
                                        <th className="px-4 py-3 font-medium">{t('field.slug')}</th>
                                        <th className="px-4 py-3 font-medium text-end">{t('perfume.manage')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seasons.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                                                {t('season.no_results')}
                                            </td>
                                        </tr>
                                    ) : (
                                        seasons.map((season) => (
                                            <tr key={season.id} className="border-b last:border-0 hover:bg-muted/50">
                                                <td className="px-4 py-3 font-medium">{season.name?.[locale] || '-'}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{season.slug}</td>
                                                <td className="px-4 py-3 text-end">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => { setEditingSeason(season); setIsAddOpen(true); }}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => {
                                                            if (confirm(t('season.delete_confirm').replace('{name}', season.name?.[locale] ?? ''))) {
                                                                router.delete(route('seasons.destroy', season.id));
                                                            }
                                                        }}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <SeasonForm
                open={isAddOpen}
                onOpenChange={(o) => { setIsAddOpen(o); if (!o) setEditingSeason(null); }}
                editingSeason={editingSeason}
            />
        </AppLayout>
    );
}
