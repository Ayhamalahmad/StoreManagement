import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { FragranceCategoryForm } from '@/features/FragranceCategories';
import type { FragranceCategory } from '@/features/FragranceCategories/types';

interface PageProps {
    categories: FragranceCategory[];
}

export default function FragranceCategoriesManage() {
    const { categories } = usePage<PageProps>().props;
    const { t, locale } = useLanguage();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<FragranceCategory | null>(null);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('category.manage'), href: '/fragrance-categories' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('category.manage')} />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('category.manage')}</h1>
                        <p className="text-muted-foreground">{t('category.manage.desc')}</p>
                    </div>
                    <Button onClick={() => { setEditingCategory(null); setIsAddOpen(true); }}>
                        <Plus className="me-2 h-4 w-4" /> {t('category.add')}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>{t('category.all')} ({categories.length})</CardTitle>
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
                                    {categories.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                                {t('category.no_results')}
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((cat) => (
                                            <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/50">
                                                <td className="px-4 py-3 font-medium">{cat.name?.[locale] || '-'}</td>
                                                <td className="px-4 py-3"><Badge variant="secondary">{cat.type}</Badge></td>
                                                <td className="px-4 py-3 text-muted-foreground">{cat.slug}</td>
                                                <td className="px-4 py-3 text-end">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => { setEditingCategory(cat); setIsAddOpen(true); }}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => {
                                                            if (confirm(t('category.delete_confirm').replace('{name}', cat.name?.[locale] ?? ''))) {
                                                                router.delete(route('fragrance-categories.destroy', cat.id));
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

            <FragranceCategoryForm
                open={isAddOpen}
                onOpenChange={(o) => { setIsAddOpen(o); if (!o) setEditingCategory(null); }}
                editingCategory={editingCategory}
            />
        </AppLayout>
    );
}
