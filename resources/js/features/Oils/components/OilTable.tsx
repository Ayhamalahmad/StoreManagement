import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Oil } from '../types';

interface Props {
    oils: Oil[];
    visibleFields: Set<string>;
    onEdit: (oil: Oil) => void;
    onDelete: (oil: Oil) => void;
}

const oilFieldKeys = ['category', 'brand', 'volume', 'price', 'section', 'shelf', 'warehouse', 'supplier', 'notes'];

export function OilTable({ oils, visibleFields, onEdit, onDelete }: Props) {
    const { t, locale } = useLanguage();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('oil.all')} ({oils.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-muted-foreground">
                                <th className="px-4 py-3 font-medium">{t('field.code')}</th>
                                <th className="px-4 py-3 font-medium">{t('field.name')}</th>
                                {oilFieldKeys.filter((f) => visibleFields.has(f)).map((field) => (
                                    <th key={field} className="px-4 py-3 font-medium">{t(`field.${field}`)}</th>
                                ))}
                                <th className="px-4 py-3 font-medium text-right">{t('oil.manage')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oils.length === 0 ? (
                                <tr>
                                    <td colSpan={99} className="px-4 py-8 text-center text-muted-foreground">
                                        {t('oil.no_results')}
                                    </td>
                                </tr>
                            ) : (
                                oils.map((oil) => (
                                    <tr key={oil.id} className="border-b last:border-0 hover:bg-muted/50">
                                        <td className="px-4 py-3">
                                            <Badge variant="secondary">{oil.code}</Badge>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{oil.name?.[locale] || '-'}</td>
                                        {visibleFields.has('category') && <td className="px-4 py-3 text-muted-foreground">{oil.category?.[locale] || '-'}</td>}
                                        {visibleFields.has('brand') && <td className="px-4 py-3 text-muted-foreground">{oil.brand || '-'}</td>}
                                        {visibleFields.has('volume') && <td className="px-4 py-3 text-muted-foreground">{oil.volume != null ? `${oil.volume} ml` : '-'}</td>}
                                        {visibleFields.has('price') && <td className="px-4 py-3 text-muted-foreground">{oil.price != null ? `$${oil.price}` : '-'}</td>}
                                        {visibleFields.has('section') && <td className="px-4 py-3 text-muted-foreground">{oil.section || '-'}</td>}
                                        {visibleFields.has('shelf') && <td className="px-4 py-3 text-muted-foreground">{oil.shelf || '-'}</td>}
                                        {visibleFields.has('warehouse') && <td className="px-4 py-3 text-muted-foreground">{oil.warehouse || '-'}</td>}
                                        {visibleFields.has('supplier') && <td className="px-4 py-3 text-muted-foreground">{oil.supplier || '-'}</td>}
                                        {visibleFields.has('notes') && <td className="px-4 py-3 text-muted-foreground">{oil.notes?.[locale] || '-'}</td>}
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(oil)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => onDelete(oil)}>
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
