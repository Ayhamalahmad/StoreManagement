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
import { PerfumeStats, PerfumeTable, PerfumeForm } from '@/features/Perfumes';
import type { Perfume } from '@/features/Perfumes/types';
import type { Season } from '@/features/Seasons/types';
import type { FragranceCategory } from '@/features/FragranceCategories/types';
import type { SillageLevel } from '@/features/SillageLevels/types';

interface PageProps {
    perfumes: Perfume[];
    seasons: Season[];
    fragranceCategories: FragranceCategory[];
    sillageLevels: SillageLevel[];
    [key: string]: unknown;
}

const fieldKeys = ['name', 'code', 'original_perfume', 'image', 'family', 'shelf', 'section', 'seasons', 'fragrance_categories', 'sillage_levels', 'notes', 'top_notes', 'middle_notes', 'base_notes', 'warehouse', 'concentration', 'sillage', 'price'];

export default function PerfumesManage() {
    const { perfumes, seasons, fragranceCategories, sillageLevels } = usePage<PageProps>().props;
    const { t, locale } = useLanguage();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('nav.perfumes'), href: '/perfumes' },
        { title: t('nav.manage'), href: '/perfumes/manage' },
    ];
    const [search, setSearch] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
    const [deletingPerfume, setDeletingPerfume] = useState<Perfume | null>(null);
    const fieldPanelRef = useRef<HTMLDivElement>(null);

    const [visibleFields, setVisibleFields] = useState<Set<string>>(() => {
        const saved = localStorage.getItem('perfumeVisibleFields');
        return saved ? new Set(JSON.parse(saved)) : new Set(fieldKeys);
    });
    const [showFieldPanel, setShowFieldPanel] = useState(false);

    useEffect(() => {
        localStorage.setItem('perfumeVisibleFields', JSON.stringify([...visibleFields]));
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

    const filtered = perfumes.filter((p) => {
        const searchStr = search.toLowerCase();
        const searchable = [
            p.code, p.section, p.shelf, p.warehouse,
            ...Object.values(p.name ?? {}),
            ...Object.values(p.original_perfume ?? {}),
            ...Object.values(p.family ?? {}),
            ...Object.values(p.concentration ?? {}),
            ...Object.values(p.sillage ?? {}),
            ...(p.seasons?.flatMap((s) => Object.values(s.name ?? {})) ?? []),
            ...(p.fragrance_categories?.flatMap((c) => Object.values(c.name ?? {})) ?? []),
            ...(p.sillage_levels?.flatMap((l) => Object.values(l.name ?? {})) ?? []),
        ];
        return searchable.some((val) => val?.toLowerCase().includes(searchStr));
    });

    const getFieldLabel = (key: string) => t(`field.${key}`);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Perfumes" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{t('perfume.manage')}</h1>
                        <p className="text-muted-foreground">{t('perfume.manage.desc')}</p>
                    </div>
                    <div className="relative flex items-center gap-2">
                        <Button variant="outline" onClick={() => setShowFieldPanel((p) => !p)}>
                            {showFieldPanel ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                            {t('perfume.fields')}
                        </Button>
                        <Button onClick={() => { setEditingPerfume(null); setIsAddOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" /> {t('perfume.add')}
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

                <PerfumeStats perfumes={perfumes} />

                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder={t('perfume.search')}
                                className="ps-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <PerfumeTable
                    perfumes={filtered}
                    visibleFields={visibleFields}
                    onEdit={(p) => { setEditingPerfume(p); setIsAddOpen(true); }}
                    onDelete={setDeletingPerfume}
                />
            </div>

            <PerfumeForm
                open={isAddOpen}
                onOpenChange={(o) => { setIsAddOpen(o); if (!o) setEditingPerfume(null); }}
                editingPerfume={editingPerfume}
                visibleFields={visibleFields}
                seasons={seasons}
                fragranceCategories={fragranceCategories}
                sillageLevels={sillageLevels}
            />

            <Dialog open={!!deletingPerfume} onOpenChange={(o) => !o && setDeletingPerfume(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('perfume.delete')}</DialogTitle>
                        <DialogDescription>
                            {t('perfume.delete_confirm').replace('{name}', deletingPerfume?.name?.[locale] ?? '').replace('{code}', deletingPerfume?.code ?? '')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeletingPerfume(null)}>{t('perfume.cancel')}</Button>
                        <Button variant="destructive" onClick={() => {
                            if (deletingPerfume) {
                                router.delete(route('perfumes.destroy', deletingPerfume.id), {
                                    onSuccess: () => setDeletingPerfume(null),
                                });
                            }
                        }}>{t('perfume.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
