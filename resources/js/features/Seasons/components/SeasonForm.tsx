import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/hooks/use-language';
import type { Locale } from '@/hooks/use-language';
import type { FormEventHandler } from 'react';
import type { Season, SeasonFormData } from '../types';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingSeason: Season | null;
}

const localeFlags: Record<Locale, string> = { en: 'EN', tr: 'TR', ar: 'AR' };
const locales: Locale[] = ['en', 'tr', 'ar'];

export function SeasonForm({ open, onOpenChange, editingSeason }: Props) {
    const { t } = useLanguage();

    const { data, setData, post, put, errors, processing, reset } = useForm<SeasonFormData>({
        name: { en: '', tr: '', ar: '' },
        slug: '',
    });

    const handleOpenChange = (o: boolean) => {
        if (!o) reset();
        onOpenChange(o);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingSeason) {
            put(route('seasons.update', editingSeason.id), {
                onSuccess: () => handleOpenChange(false),
            });
        } else {
            post(route('seasons.store'), {
                onSuccess: () => handleOpenChange(false),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingSeason ? t('season.edit') : t('season.add')}</DialogTitle>
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
                            {t('season.cancel')}
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {editingSeason ? t('season.update') : t('season.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
