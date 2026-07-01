import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/use-language';
import type { Locale } from '@/hooks/use-language';
import { type FormEventHandler, useEffect } from 'react';
import type { SillageLevel, SillageLevelFormData } from '../types';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingLevel: SillageLevel | null;
}

const localeFlags: Record<Locale, string> = { en: 'EN', tr: 'TR', ar: 'AR' };
const locales: Locale[] = ['en', 'tr', 'ar'];

export function SillageLevelForm({ open, onOpenChange, editingLevel }: Props) {
    const { t } = useLanguage();

    const { data, setData, post, put, errors, processing, reset } = useForm<SillageLevelFormData>({
        name: { en: '', tr: '', ar: '' },
        slug: '',
    });

    useEffect(() => {
        if (open && editingLevel) {
            setData({
                name: editingLevel.name ?? { en: '', tr: '', ar: '' },
                slug: editingLevel.slug ?? '',
            });
        } else if (open) {
            reset();
        }
    }, [open, editingLevel]);

    const handleOpenChange = (o: boolean) => {
        if (!o) reset();
        onOpenChange(o);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingLevel) {
            put(route('sillage-levels.update', editingLevel.id), {
                onSuccess: () => handleOpenChange(false),
            });
        } else {
            post(route('sillage-levels.store'), {
                onSuccess: () => handleOpenChange(false),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingLevel ? t('sillage_level.edit') : t('sillage_level.add')}</DialogTitle>
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
                            {t('sillage_level.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {editingLevel ? t('sillage_level.update') : t('sillage_level.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
