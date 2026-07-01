import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { SillageLevelForm } from '@/features/SillageLevels';
import type { SillageLevel } from '@/features/SillageLevels/types';

interface PageProps {
    sillageLevels: SillageLevel[];
}

export default function SillageLevelsManage() {
    const { sillageLevels } = usePage<PageProps>().props;
    const { t, locale } = useLanguage();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingLevel, setEditingLevel] = useState<SillageLevel | null>(null);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('sillage_level.manage'), href: '/sillage-levels' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('sillage_level.manage')} />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('sillage_level.manage')}</h1>
                        <p className="text-muted-foreground">{t('sillage_level.manage.desc')}</p>
                    </div>
                    <Button onClick={() => { setEditingLevel(null); setIsAddOpen(true); }}>
                        <Plus className="me-2 h-4 w-4" /> {t('sillage_level.add')}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('sillage_level.all')} ({sillageLevels.length})</CardTitle>
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
                                    {sillageLevels.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                                                {t('sillage_level.no_results')}
                                            </td>
                                        </tr>
                                    ) : (
                                        sillageLevels.map((level) => (
                                            <tr key={level.id} className="border-b last:border-0 hover:bg-muted/50">
                                                <td className="px-4 py-3 font-medium">{level.name?.[locale] || '-'}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{level.slug}</td>
                                                <td className="px-4 py-3 text-end">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => { setEditingLevel(level); setIsAddOpen(true); }}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => {
                                                            if (confirm(t('sillage_level.delete_confirm').replace('{name}', level.name?.[locale] ?? ''))) {
                                                                router.delete(route('sillage-levels.destroy', level.id));
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

            <SillageLevelForm
                open={isAddOpen}
                onOpenChange={(o) => { setIsAddOpen(o); if (!o) setEditingLevel(null); }}
                editingLevel={editingLevel}
            />
        </AppLayout>
    );
}
