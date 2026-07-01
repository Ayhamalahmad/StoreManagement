import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Perfume } from '../types';

interface Props {
    perfumes: Perfume[];
    visibleFields: Set<string>;
    onEdit: (perfume: Perfume) => void;
    onDelete: (perfume: Perfume) => void;
}

export function PerfumeTable({ perfumes, visibleFields, onEdit, onDelete }: Props) {
    const { t, locale } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('perfume.all')} ({perfumes.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-muted-foreground">
                                <th className="px-4 py-3 font-medium">{t('field.code')}</th>
                                <th className="px-4 py-3 font-medium">{t('field.name')}</th>
                                {['top_notes', 'middle_notes', 'base_notes', 'fragrance_categories', 'family', 'section', 'shelf', 'seasons', 'concentration', 'sillage', 'sillage_levels', 'price', 'warehouse'].filter((f) => visibleFields.has(f)).map((field) => (
                                    <th key={field} className="px-4 py-3 font-medium">{t(`field.${field}`)}</th>
                                ))}
                                <th className="px-4 py-3 font-medium text-right">{t('perfume.manage')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {perfumes.length === 0 ? (
                                <tr>
                                    <td colSpan={99} className="px-4 py-8 text-center text-muted-foreground">
                                        {t('perfume.no_results')}
                                    </td>
                                </tr>
                            ) : (
                                perfumes.map((perfume) => (
                                    <tr key={perfume.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="px-4 py-3">
                                            <Badge variant="secondary">{perfume.code}</Badge>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{perfume.name?.[locale] || '-'}</td>
                                        {visibleFields.has('top_notes') && <td className="px-4 py-3 text-muted-foreground">{perfume.top_notes?.[locale] || '-'}</td>}
                                        {visibleFields.has('middle_notes') && <td className="px-4 py-3 text-muted-foreground">{perfume.middle_notes?.[locale] || '-'}</td>}
                                        {visibleFields.has('base_notes') && <td className="px-4 py-3 text-muted-foreground">{perfume.base_notes?.[locale] || '-'}</td>}
                                        {visibleFields.has('fragrance_categories') && (
                                            <td className="px-4 py-3">
                                                {perfume.fragrance_categories?.length > 0
                                                    ? perfume.fragrance_categories.map((c) => c.name?.[locale]).filter(Boolean).join(', ')
                                                    : '-'}
                                            </td>
                                        )}
                                        {visibleFields.has('family') && <td className="px-4 py-3 text-muted-foreground">{perfume.family?.[locale] || '-'}</td>}
                                        {visibleFields.has('section') && <td className="px-4 py-3 text-muted-foreground">{perfume.section || '-'}</td>}
                                        {visibleFields.has('shelf') && <td className="px-4 py-3 text-muted-foreground">{perfume.shelf || '-'}</td>}
                                        {visibleFields.has('seasons') && (
                                            <td className="px-4 py-3">
                                                {perfume.seasons?.map((s) => s.name?.[locale]).filter(Boolean).join(', ') || '-'}
                                            </td>
                                        )}
                                        {visibleFields.has('concentration') && <td className="px-4 py-3 text-muted-foreground">{perfume.concentration?.[locale] || '-'}</td>}
                                        {visibleFields.has('sillage') && <td className="px-4 py-3 text-muted-foreground">{perfume.sillage?.[locale] || '-'}</td>}
                                        {visibleFields.has('sillage_levels') && (
                                            <td className="px-4 py-3">
                                                {perfume.sillage_levels?.map((l) => l.name?.[locale]).filter(Boolean).join(', ') || '-'}
                                            </td>
                                        )}
                                        {visibleFields.has('price') && <td className="px-4 py-3 text-muted-foreground">{perfume.price != null ? `$${perfume.price}` : '-'}</td>}
                                        {visibleFields.has('warehouse') && <td className="px-4 py-3 text-muted-foreground">{perfume.warehouse || '-'}</td>}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(perfume)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => onDelete(perfume)}>
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
    );
}
