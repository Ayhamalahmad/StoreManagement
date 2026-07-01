import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { type FormEventHandler, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';
import type { Locale } from '@/types';
import type { Oil, OilFormData } from '../types';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingOil: Oil | null;
    visibleFields: Set<string>;
}

const fieldKeys = ['name', 'code', 'image', 'category', 'brand', 'volume', 'price', 'shelf', 'section', 'warehouse', 'notes', 'supplier'];

const localeFlags: Record<Locale, string> = { en: 'EN', tr: 'TR', ar: 'AR' };
const locales: Locale[] = ['en', 'tr', 'ar'];
const makeLocaleObj = (): Record<string, string> => ({ en: '', tr: '', ar: '' });

export function OilForm({ open, onOpenChange, editingOil, visibleFields }: Props) {
    const { t, locale } = useLanguage();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, errors, processing, reset } = useForm<OilFormData>({
        name: makeLocaleObj(),
        code: '',
        image: null,
        imagePreview: '',
        category: makeLocaleObj(),
        brand: '',
        volume: '',
        price: '',
        shelf: '',
        section: '',
        warehouse: '',
        notes: makeLocaleObj(),
        supplier: '',
    });

    useEffect(() => {
        if (open && editingOil) {
            setData({
                name: editingOil.name ?? makeLocaleObj(),
                code: editingOil.code,
                image: null,
                imagePreview: '',
                category: editingOil.category ?? makeLocaleObj(),
                brand: editingOil.brand ?? '',
                volume: editingOil.volume?.toString() ?? '',
                price: editingOil.price?.toString() ?? '',
                shelf: editingOil.shelf ?? '',
                section: editingOil.section ?? '',
                warehouse: editingOil.warehouse ?? '',
                notes: editingOil.notes ?? makeLocaleObj(),
                supplier: editingOil.supplier ?? '',
            });
        } else if (open) {
            reset();
        }
    }, [open, editingOil]);

    const setLocaleValue = (field: string, loc: string, value: string) => {
        setData(field as keyof OilFormData, { ...(data as any)[field], [loc]: value } as any);
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
        if (editingOil) {
            put(route('oils.update', editingOil.id), {
                forceFormData: true,
                onSuccess: () => onOpenChange(false),
            });
        } else {
            post(route('oils.store'), {
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
                        {editingOil ? t('oil.edit') : t('oil.add')}
                    </DialogTitle>
                    <DialogDescription>
                        {editingOil ? t('oil.edit') : t('oil.add')}
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
                        {visibleFields.has('image') && (
                            <div className="space-y-2 sm:col-span-2">
                                <Label>{getFieldLabel('image')}</Label>
                                <div className="flex items-center gap-4">
                                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                        <Upload className="mr-2 h-4 w-4" /> {t('field.image_choose')}
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {data.image ? data.image.name : (editingOil?.image ? t('field.image_keep') : t('field.image_none'))}
                                    </span>
                                </div>
                                <Input ref={fileInputRef} id="image" type="file" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" className="hidden" onChange={handleImageChange} />
                                {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                                {(data.imagePreview || editingOil?.image_url) && (
                                    <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-md border">
                                        <img src={data.imagePreview || editingOil?.image_url || ''} alt="Preview" className="h-full w-full object-contain p-2" />
                                    </div>
                                )}
                            </div>
                        )}
                        {visibleFields.has('category') && (
                            <div className="space-y-1 sm:col-span-2">
                                <Label>{getFieldLabel('category')} *</Label>
                                {renderLocaleInputs('category', true)}
                                {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                            </div>
                        )}
                        {visibleFields.has('brand') && (
                            <div className="space-y-2">
                                <Label htmlFor="brand">{getFieldLabel('brand')}</Label>
                                <Input id="brand" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                            </div>
                        )}
                        {visibleFields.has('volume') && (
                            <div className="space-y-2">
                                <Label htmlFor="volume">{getFieldLabel('volume')} (ml)</Label>
                                <Input id="volume" type="number" step="0.01" min="0" value={data.volume} onChange={(e) => setData('volume', e.target.value)} />
                            </div>
                        )}
                        {visibleFields.has('price') && (
                            <div className="space-y-2">
                                <Label htmlFor="price">{getFieldLabel('price')}</Label>
                                <Input id="price" type="number" step="0.01" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} />
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
                        {visibleFields.has('warehouse') && (
                            <div className="space-y-2">
                                <Label htmlFor="warehouse">{getFieldLabel('warehouse')}</Label>
                                <Input id="warehouse" value={data.warehouse} onChange={(e) => setData('warehouse', e.target.value)} />
                            </div>
                        )}
                        {visibleFields.has('supplier') && (
                            <div className="space-y-2">
                                <Label htmlFor="supplier">{getFieldLabel('supplier')}</Label>
                                <Input id="supplier" value={data.supplier} onChange={(e) => setData('supplier', e.target.value)} />
                            </div>
                        )}
                    </div>
                    {visibleFields.has('notes') && (
                        <div className="space-y-1">
                            <Label>{getFieldLabel('notes')}</Label>
                            {renderLocaleInputs('notes')}
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            {t('oil.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {editingOil ? t('oil.update') : t('oil.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
