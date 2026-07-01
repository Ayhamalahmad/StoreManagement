import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/use-language';
import type { Locale } from '@/hooks/use-language';
import { type FormEventHandler, useEffect } from 'react';
import type { FragranceCategory, FragranceCategoryFormData } from '../types';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingCategory: FragranceCategory | null;
}

const localeFlags: Record<Locale, string> = { en: 'EN', tr: 'TR', ar: 'AR' };
const locales: Locale[] = ['en', 'tr', 'ar'];

export function FragranceCategoryForm({ open, onOpenChange, editingCategory }: Props) {
    const { t } = useLanguage();

    const { data, setData, post, put, errors, processing, reset } = useForm<FragranceCategoryFormData>({
        name: { en: '', tr: '', ar: '' },
        type: 'frequency',
        slug: '',
    });

    useEffect(() => {
        if (open && editingCategory) {
            setData({
                name: editingCategory.name ?? { en: '', tr: '', ar: '' },
                type: editingCategory.type ?? 'frequency',
                slug: editingCategory.slug ?? '',
            });
        } else if (open) {
            reset();
        }
    }, [open, editingCategory]);

    const handleOpenChange = (o: boolean) => {
        if (!o) reset();
        onOpenChange(o);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('fragrance-categories.update', editingCategory.id), {
                onSuccess: () => handleOpenChange(false),
            });
        } else {
            post(route('fragrance-categories.store'), {
                onSuccess: () => handleOpenChange(false),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingCategory ? t('category.edit') : t('category.add')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <Label>{t('field.name')} *</Label>
                        <div className="flex gap-2">
                            {locales.map((loc) => (
                                <div key={loc} className="flex-1 space-y-1">
                                    <div className="text-xs font-medium text-muted-foreground">{localeFlags[loc]}</div>
                                    <Input
                                        value={data.name?.[loc] ?? ''}
                                        onChange={(e) => setData('name', { ...data.name, [loc]: e.target.value })}
                                    />
                                </div>
                            ))}
                        </div>
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="type">{t('field.type')} *</Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) => setData('type', value)}
                        >
                            <SelectTrigger id="type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="frequency">Frequency</SelectItem>
                                <SelectItem value="niche">Niche</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="slug">{t('field.slug')}</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                        />
                        {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                            {t('category.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {editingCategory ? t('category.update') : t('category.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
