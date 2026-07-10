import { useState, FormEvent, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProduct } from '../hooks/useProducts';
import type { ProductFormData, ProductData } from '../types/products.types';

interface ProductFormProps {
    product?: ProductData | null;
    isEdit?: boolean;
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
    const { t } = useTranslation();
    const [form, setForm] = useState<ProductFormData>({
        code: '',
        name: '',
        brand: '',
        gender: 'men',
        category: 'designer',
        section_number: 1,
        shelf_number: 1,
        is_available: true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (product) {
            setForm({
                code: product.code,
                name: product.name,
                brand: product.brand,
                inspired_by: product.inspired_by || '',
                gender: product.gender,
                category: product.category,
                description: product.description || '',
                top_notes: product.top_notes || '',
                middle_notes: product.middle_notes || '',
                base_notes: product.base_notes || '',
                section_number: product.section_number,
                shelf_number: product.shelf_number,
                is_available: product.is_available,
                perfume_image_preview: product.perfume_image_full || undefined,
                inspired_image_preview: product.inspired_image_full || undefined,
            });
        }
    }, [product]);

    const update = (key: string, value: unknown) => {
        setForm(prev => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        }
    };

    const setFile = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) update(key, file);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (v !== undefined && v !== null && k !== 'perfume_image_preview' && k !== 'inspired_image_preview') {
                fd.append(k, v instanceof File ? v : String(v));
            }
        });

        if (isEdit && product) {
            fd.append('_method', 'PUT');
            router.post('/dashboard/products/' + product.id, fd, {
                onSuccess: () => setProcessing(false),
                onError: (err) => { setErrors(err as Record<string, string>); setProcessing(false); },
            });
        } else {
            router.post('/dashboard/products', fd, {
                onSuccess: () => setProcessing(false),
                onError: (err) => { setErrors(err as Record<string, string>); setProcessing(false); },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="code">{t('Code')}</Label>
                    <Input id="code" value={form.code} onChange={e => update('code', e.target.value)} required />
                    {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">{t('Name')}</Label>
                    <Input id="name" value={form.name} onChange={e => update('name', e.target.value)} required />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="brand">{t('Brand')}</Label>
                    <Input id="brand" value={form.brand} onChange={e => update('brand', e.target.value)} required />
                    {errors.brand && <p className="text-xs text-destructive">{errors.brand}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="inspired_by">{t('Inspired By')}</Label>
                    <Input id="inspired_by" value={form.inspired_by || ''} onChange={e => update('inspired_by', e.target.value)} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>{t('Gender')}</Label>
                    <Select value={form.gender} onValueChange={v => update('gender', v)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="men">{t('Men')}</SelectItem>
                            <SelectItem value="women">{t('Women')}</SelectItem>
                            <SelectItem value="unisex">{t('Unisex')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>{t('Category')}</Label>
                    <Select value={form.category} onValueChange={v => update('category', v)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="designer">{t('Designer')}</SelectItem>
                            <SelectItem value="niche">{t('Niche')}</SelectItem>
                            <SelectItem value="nishe">{t('Nishe')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">{t('Description')}</Label>
                <textarea
                    id="description"
                    value={form.description || ''}
                    onChange={e => update('description', e.target.value)}
                    rows={3}
                    className="border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="section_number">{t('Section Number')}</Label>
                    <Input id="section_number" type="number" min={1} value={form.section_number} onChange={e => update('section_number', Number(e.target.value))} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="shelf_number">{t('Shelf Number')}</Label>
                    <Input id="shelf_number" type="number" min={1} value={form.shelf_number} onChange={e => update('shelf_number', Number(e.target.value))} required />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="top_notes">{t('Top Notes')}</Label>
                    <textarea id="top_notes" value={form.top_notes || ''} onChange={e => update('top_notes', e.target.value)} rows={2}
                        className="border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="middle_notes">{t('Middle Notes')}</Label>
                    <textarea id="middle_notes" value={form.middle_notes || ''} onChange={e => update('middle_notes', e.target.value)} rows={2}
                        className="border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="base_notes">{t('Base Notes')}</Label>
                    <textarea id="base_notes" value={form.base_notes || ''} onChange={e => update('base_notes', e.target.value)} rows={2}
                        className="border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Checkbox id="avail" checked={form.is_available} onCheckedChange={v => update('is_available', v)} />
                <Label htmlFor="avail">{t('Available')}</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="perfume_image">{t('Perfume Image')}</Label>
                    <Input id="perfume_image" type="file" accept="image/*" onChange={setFile('perfume_image')} />
                    {form.perfume_image_preview && (
                        <img src={form.perfume_image_preview} className="w-20 h-20 object-cover mt-2 rounded" alt={t('Preview')} />
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="inspired_image">{t('Inspired Image')}</Label>
                    <Input id="inspired_image" type="file" accept="image/*" onChange={setFile('inspired_image')} />
                    {form.inspired_image_preview && (
                        <img src={form.inspired_image_preview} className="w-20 h-20 object-cover mt-2 rounded" alt={t('Preview')} />
                    )}
                </div>
            </div>

            <Button type="submit" disabled={processing} className="w-full">
                {processing ? t('Saving...') : isEdit ? t('Update Perfume') : t('Create Perfume')}
            </Button>
        </form>
    );
}
