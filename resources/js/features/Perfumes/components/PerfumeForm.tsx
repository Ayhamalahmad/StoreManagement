import { useForm } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { type FormEventHandler, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';
import type { Locale } from '@/types';
import type { Perfume, PerfumeFormData } from '../types';
import type { Season } from '@/features/Seasons/types';
import type { FragranceCategory } from '@/features/FragranceCategories/types';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingPerfume: Perfume | null;
    visibleFields: Set<string>;
    seasons: Season[];
    fragranceCategories: FragranceCategory[];
}

const fieldKeys = ['name', 'code', 'original_perfume', 'image', 'family', 'shelf', 'section', 'seasons', 'fragrance_categories', 'notes', 'top_notes', 'middle_notes', 'base_notes', 'warehouse', 'concentration', 'sillage', 'price'];

const localeFlags: Record<Locale, string> = { en: 'EN', tr: 'TR', ar: 'AR' };
const locales: Locale[] = ['en', 'tr', 'ar'];
const makeLocaleObj = (): Record<string, string> => ({ en: '', tr: '', ar: '' });

export function PerfumeForm({ open, onOpenChange, editingPerfume, visibleFields, seasons, fragranceCategories }: Props) {
    const { t, locale } = useLanguage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, errors, processing, reset } = useForm<PerfumeFormData>({
        name: makeLocaleObj(),
        code: '',
        original_perfume: makeLocaleObj(),
        image: null,
        imagePreview: '',
        family: makeLocaleObj(),
        shelf: '',
        section: '',
        notes: makeLocaleObj(),
        top_notes: makeLocaleObj(),
        middle_notes: makeLocaleObj(),
        base_notes: makeLocaleObj(),
        warehouse: '',
        concentration: makeLocaleObj(),
        sillage: makeLocaleObj(),
        price: '',
        season_ids: [],
        fragrance_category_ids: [],
    });

    useEffect(() => {
        if (open && editingPerfume) {
            setData({
                name: editingPerfume.name ?? makeLocaleObj(),
                code: editingPerfume.code,
                original_perfume: editingPerfume.original_perfume ?? makeLocaleObj(),
                image: null,
                imagePreview: '',
                family: editingPerfume.family ?? makeLocaleObj(),
                shelf: editingPerfume.shelf ?? '',
                section: editingPerfume.section ?? '',
                notes: editingPerfume.notes ?? makeLocaleObj(),
                top_notes: editingPerfume.top_notes ?? makeLocaleObj(),
                middle_notes: editingPerfume.middle_notes ?? makeLocaleObj(),
                base_notes: editingPerfume.base_notes ?? makeLocaleObj(),
                warehouse: editingPerfume.warehouse ?? '',
                concentration: editingPerfume.concentration ?? makeLocaleObj(),
                sillage: editingPerfume.sillage ?? makeLocaleObj(),
                price: editingPerfume.price?.toString() ?? '',
                season_ids: editingPerfume.seasons?.map((s) => s.id) ?? [],
                fragrance_category_ids: editingPerfume.fragrance_categories?.map((c) => c.id) ?? [],
            });
        } else if (open) {
            reset();
        }
    }, [open, editingPerfume]);

    const setLocaleValue = (field: string, loc: string, value: string) => {
        setData(field as keyof PerfumeFormData, { ...(data as any)[field], [loc]: value } as any);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setData('imagePreview', event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingPerfume) {
            put(route('perfumes.update', editingPerfume.id), {
                forceFormData: true,
                onSuccess: () => onOpenChange(false),
            });
        } else {
            post(route('perfumes.store'), {
                forceFormData: true,
                onSuccess: () => onOpenChange(false),
            });
        }
    };

    const renderLocaleInputs = (field: string, required = false) => (
        <div className="flex gap-2">
            {locales.map((loc) => (
                <div key={loc} className="flex-1 space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">{localeFlags[loc]}</div>
                    <Input
                        value={(data as any)[field]?.[loc] ?? ''}
                        onChange={(e) => setLocaleValue(field, loc, e.target.value)}
                        required={required}
                    />
                </div>
            ))}
        </div>
    );

    const getFieldLabel = (key: string) => t(`field.${key}`);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {editingPerfume ? t('perfume.edit') : t('perfume.add')}
                    </DialogTitle>
                    <DialogDescription>
                        {editingPerfume ? t('perfume.edit') : t('perfume.add')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {visibleFields.has('name') && (
                            <div className="space-y-1 sm:col-span-2">
                                <Label>{getFieldLabel('name')} *</Label>
                                {renderLocaleInputs('name', true)}
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="code">{getFieldLabel('code')} *</Label>
                            <Input id="code" value={data.code} onChange={(e) => setData('code', e.target.value)} required />
                            {errors.code && <p className="text-sm text-destructive">{errors.code}</p>}
                        </div>
                        {visibleFields.has('original_perfume') && (
                            <div className="space-y-1 sm:col-span-2">
                                <Label>{getFieldLabel('original_perfume')}</Label>
                                {renderLocaleInputs('original_perfume')}
                            </div>
                        )}
                        {visibleFields.has('image') && (
                            <div className="space-y-2 sm:col-span-2">
                                <Label>{getFieldLabel('image')}</Label>
                                <div className="flex items-center gap-4">
                                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" /> {t('field.image_choose')}
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {data.image ? data.image.name : (editingPerfume?.image ? t('field.image_keep') : t('field.image_none'))}
                                    </span>
                                </div>
                                <Input ref={fileInputRef} id="image" type="file" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" className="hidden" onChange={handleImageChange} />
                                {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                                {(data.imagePreview || editingPerfume?.image_url) && (
                                    <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-md border">
                                        <img src={data.imagePreview || editingPerfume?.image_url || ''} alt="Preview" className="h-full w-full object-contain p-2" />
                                    </div>
                                )}
                            </div>
                        )}
                        {visibleFields.has('family') && (
                            <div className="space-y-1 sm:col-span-2">
                                <Label>{getFieldLabel('family')}</Label>
                                {renderLocaleInputs('family')}
                            </div>
                        )}
                        {visibleFields.has('section') && (
                            <div className="space-y-2">
                                <Label htmlFor="section">{getFieldLabel('section')}</Label>
                                <Input id="section" value={data.section} onChange={(e) => setData('section', e.target.value)} />
                            </div>
                        )}
                        {visibleFields.has('shelf') && (
                            <div className="space-y-2">
                                <Label htmlFor="shelf">{getFieldLabel('shelf')}</Label>
                                <Input id="shelf" value={data.shelf} onChange={(e) => setData('shelf', e.target.value)} />
                            </div>
                        )}
                        {visibleFields.has('fragrance_categories') && (
                            <div className="space-y-2 sm:col-span-2">
                                <Label>{t('field.fragrance_categories')}</Label>
                                <div className="flex flex-wrap gap-3">
                                    {fragranceCategories.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                            <Checkbox
                                                checked={data.fragrance_category_ids.includes(cat.id)}
                                                onCheckedChange={(checked) => {
                                                    setData('fragrance_category_ids',
                                                        checked
                                                            ? [...data.fragrance_category_ids, cat.id]
                                                            : data.fragrance_category_ids.filter((id) => id !== cat.id)
                                                    );
                                                }}
                                            />
                                            <div>
                                                <span>{cat.name?.[locale] ?? cat.slug}</span>
                                                <Badge variant="outline" className="ml-1 text-xs">{cat.type}</Badge>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.fragrance_category_ids && <p className="text-sm text-destructive">{errors.fragrance_category_ids}</p>}
                            </div>
                        )}
                        {visibleFields.has('seasons') && (
                            <div className="space-y-2 sm:col-span-2">
                                <Label>{t('field.seasons')}</Label>
                                <div className="flex flex-wrap gap-3">
                                    {seasons.map((season) => (
                                        <label key={season.id} className="flex items-center gap-2 text-sm cursor-pointer">
                                            <Checkbox
                                                checked={data.season_ids.includes(season.id)}
                                                onCheckedChange={(checked) => {
                                                    setData('season_ids',
                                                        checked
                                                            ? [...data.season_ids, season.id]
                                                            : data.season_ids.filter((id) => id !== season.id)
                                                    );
                                                }}
                                            />
                                            <span>{season.name?.[locale] ?? season.slug}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.season_ids && <p className="text-sm text-destructive">{errors.season_ids}</p>}
                            </div>
                        )}
                        {visibleFields.has('warehouse') && (
                            <div className="space-y-2">
                                <Label htmlFor="warehouse">{getFieldLabel('warehouse')}</Label>
                                <Input id="warehouse" value={data.warehouse} onChange={(e) => setData('warehouse', e.target.value)} />
                            </div>
                        )}
                        {visibleFields.has('concentration') && (
                            <div className="space-y-1 sm:col-span-2">
                                <Label>{getFieldLabel('concentration')}</Label>
                                {renderLocaleInputs('concentration')}
                            </div>
                        )}
                        {visibleFields.has('sillage') && (
                            <div className="space-y-1 sm:col-span-2">
                                <Label>{getFieldLabel('sillage')}</Label>
                                {renderLocaleInputs('sillage')}
                            </div>
                        )}
                        {visibleFields.has('price') && (
                            <div className="space-y-2">
                                <Label htmlFor="price">{getFieldLabel('price')}</Label>
                                <Input id="price" type="number" step="0.01" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            </div>
                        )}
                    </div>
                    {(visibleFields.has('top_notes') || visibleFields.has('middle_notes') || visibleFields.has('base_notes')) && (
                        <div className="grid gap-4 sm:grid-cols-3">
                            {['top_notes', 'middle_notes', 'base_notes'].filter((f) => visibleFields.has(f)).map((field) => (
                                <div key={field} className="space-y-1">
                                    <Label>{getFieldLabel(field)}</Label>
                                    <div className="flex flex-col gap-1">
                                        {locales.map((loc) => (
                                            <div key={loc} className="flex items-center gap-1">
                                                <span className="w-5 text-xs font-medium text-muted-foreground">{localeFlags[loc]}</span>
                                                <Input value={(data as any)[field]?.[loc] ?? ''} onChange={(e) => setLocaleValue(field, loc, e.target.value)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {visibleFields.has('notes') && (
                        <div className="space-y-1">
                            <Label>{getFieldLabel('notes')}</Label>
                            {renderLocaleInputs('notes')}
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            {t('perfume.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {editingPerfume ? t('perfume.update') : t('perfume.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
