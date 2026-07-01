import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Globe, Search } from 'lucide-react';
import { useLanguage, type Locale } from '@/hooks/use-language';

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    activeTab: string;
    onTabChange: (value: string) => void;
}

const categoryTabValues = ['all', 'essential', 'fragrance', 'carrier', 'blend'];

export function OilFilters({ search, onSearchChange, activeTab, onTabChange }: Props) {
    const { t, locale, setLocale } = useLanguage();

    const locales: { value: Locale; label: string }[] = [
        { value: 'en', label: 'English' },
        { value: 'tr', label: 'Türkçe' },
        { value: 'ar', label: 'العربية' },
    ];

    return (
        <>
            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="text-muted-foreground absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder={t('oil.search_placeholder')}
                                className="ps-10"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                        <Button>{t('oil.search_btn')}</Button>
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
                    {categoryTabValues.map((tab) => (
                        <TabsTrigger key={tab} value={tab}>
                            {t(`oil.${tab}_tab`)}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <Card>
                <CardContent className="grid gap-4 p-4 md:grid-cols-4">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={t('oil.category')} />
                        </SelectTrigger>
                    </Select>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={t('oil.shelf')} />
                        </SelectTrigger>
                    </Select>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder={t('oil.section')} />
                        </SelectTrigger>
                    </Select>
                    <Button variant="outline">{t('oil.clear_filters')}</Button>
                </CardContent>
            </Card>
        </>
    );
}
