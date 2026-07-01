import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Plus, Eye, EyeOff } from 'lucide-react';
import { useLanguage, type Locale } from '@/hooks/use-language';
import { useEffect, useRef, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { OilStats, OilTable, OilForm } from '@/features/Oils';
import type { Oil } from '@/features/Oils/types';

interface PageProps {
    oils: Oil[];
    [key: string]: unknown;
}

const fieldKeys = ['name', 'code', 'image', 'category', 'brand', 'volume', 'price', 'shelf', 'section', 'warehouse', 'notes', 'supplier'];

export default function OilsManage() {
    const { oils } = usePage<PageProps>().props;
    const { t, locale } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('nav.oils'), href: '/oils' },
        { title: t('nav.manage'), href: '/oils/manage' },
    ];
    const [search, setSearch] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingOil, setEditingOil] = useState<Oil | null>(null);
    const [deletingOil, setDeletingOil] = useState<Oil | null>(null);
    const fieldPanelRef = useRef<HTMLDivElement>(null);

    const [visibleFields, setVisibleFields] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('oilVisibleFields');
        return saved ? new Set(JSON.parse(saved)) : new Set(fieldKeys);
    });
    const [showFieldPanel, setShowFieldPanel] = useState(false);

    useEffect(() => {
        localStorage.setItem('oilVisibleFields', JSON.stringify([...visibleFields]));
    }, [visibleFields]);

    useEffect(() => {
        if (!showFieldPanel) return;
        const handler = (e: MouseEvent) => {
            if (fieldPanelRef.current && !fieldPanelRef.current.contains(e.target as Node)) {
                setShowFieldPanel(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showFieldPanel]);

    const toggleField = (key: string) => {
        setVisibleFields((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });
    };

    const filtered = oils.filter((o) => {
        const searchStr = search.toLowerCase();
        const searchable = [
            o.code, o.section, o.shelf, o.warehouse, o.brand, o.supplier,
            ...Object.values(o.name ?? {}),
            ...Object.values(o.category ?? {}),
            ...Object.values(o.notes ?? {}),
        ];
        return searchable.some((val) => val?.toLowerCase().includes(searchStr));
    });

    const getFieldLabel = (key: string) => t(`field.${key}`);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Oils" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('oil.manage')}</h1>
                        <p className="text-muted-foreground">{t('oil.manage.desc')}</p>
                    </div>
                    <div className="relative flex items-center gap-2">
                        <Button variant="outline" onClick={() => setShowFieldPanel((p) => !p)}>
                            {showFieldPanel ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                            {t('oil.fields')}
                        </Button>
                        <Button onClick={() => { setEditingOil(null); setIsAddOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" /> {t('oil.add')}
                        </Button>
                        {showFieldPanel && (
                            <div ref={fieldPanelRef} className="absolute right-0 top-full z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-md border bg-popover p-2 shadow-lg">
                                {fieldKeys.map((key) => (
                                    <label key={key} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted">
                                        <input type="checkbox" checked={visibleFields.has(key)} onChange={() => toggleField(key)} className="h-4 w-4" />
                                        {getFieldLabel(key)}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <OilStats oils={oils} />

                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder={t('oil.search')}
                                className="ps-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <OilTable
                    oils={filtered}
                    visibleFields={visibleFields}
                    onEdit={(o) => { setEditingOil(o); setIsAddOpen(true); }}
                    onDelete={setDeletingOil}
                />
            </div>

            <OilForm
                open={isAddOpen}
                onOpenChange={(o) => { setIsAddOpen(o); if (!o) setEditingOil(null); }}
                editingOil={editingOil}
                visibleFields={visibleFields}
            />

            <Dialog open={!!deletingOil} onOpenChange={(o) => !o && setDeletingOil(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('oil.delete')}</DialogTitle>
                        <DialogDescription>
                            {t('oil.delete_confirm').replace('{name}', deletingOil?.name?.[locale] ?? '').replace('{code}', deletingOil?.code ?? '')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeletingOil(null)}>{t('oil.cancel')}</Button>
                        <Button variant="destructive" onClick={() => {
                            if (deletingOil) {
                                router.delete(route('oils.destroy', deletingOil.id), {
                                    onSuccess: () => setDeletingOil(null),
                                });
                            }
                        }}>{t('oil.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
