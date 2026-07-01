import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage, type Locale } from '@/hooks/use-language';
import { Check, Globe, Search } from 'lucide-react';

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    activeTab: string;
    onTabChange: (value: string) => void;
}

const genderTabValues = ['all', 'erkek', 'kadin', 'unisex', 'niche', 'oil'];

export function PerfumeFilters({ search, onSearchChange, activeTab, onTabChange }: Props) {
    const { t, locale, setLocale } = useLanguage();

    const locales: { value: Locale; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'tr', label: 'Türkçe' },
        { value: 'ar', label: 'العربية' },
    ];

    return (
        <div className="sticky top-0 z-10 space-y-3 bg-background pb-2">
            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder={t('perfume.search_placeholder')}
                                className="ps-10"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                        <Button>{t('perfume.search_btn')}</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                                    <Globe className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {locales.map((l) => (
                                    <DropdownMenuItem key={l.value} onClick={() => setLocale(l.value)}>
                                        {locale === l.value && <Check className="mr-2 h-4 w-4" />}
                                        <span className={locale === l.value ? '' : 'ml-6'}>{l.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
                <TabsList className="h-auto w-full justify-start overflow-x-auto">
                    {genderTabValues.map((tab) => (
                        <TabsTrigger key={tab} value={tab}>
                            {t(`perfume.${tab}_tab`)}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
                <Badge className="cursor-pointer">{t('perfume.filter_all')}</Badge>
                <Badge variant="secondary" className="cursor-pointer">
                    ☀️ {t('perfume.filter_summer')}
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                    🍂 {t('perfume.filter_autumn')}
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                    🌸 {t('perfume.filter_spring')}
                </Badge>
                <Badge variant="secondary" className="cursor-pointer">
                    ❄️ {t('perfume.filter_winter')}
                </Badge>
            </div>
        </div>
    );
}
