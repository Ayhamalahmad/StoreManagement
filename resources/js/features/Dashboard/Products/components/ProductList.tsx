import { router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { ProductData } from '../types/products.types';

interface ProductListProps {
    products: ProductData[];
}

export default function ProductList({ products }: ProductListProps) {
    const { t } = useTranslation();

    const handleDelete = (id: number, name: string) => {
        if (window.confirm(t('Delete') + ' "' + name + '"?')) {
            router.delete('/dashboard/products/' + id);
        }
    };

    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                {t('No products found.')}
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t('Code')}</TableHead>
                    <TableHead>{t('Name')}</TableHead>
                    <TableHead>{t('Brand')}</TableHead>
                    <TableHead>{t('Gender')}</TableHead>
                    <TableHead>{t('Category')}</TableHead>
                    <TableHead>{t('Section')}</TableHead>
                    <TableHead>{t('Shelf')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead className="text-right">{t('Actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell className="font-mono text-xs">{product.code}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-muted-foreground">{product.brand}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{t(product.gender.charAt(0).toUpperCase() + product.gender.slice(1))}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{t(product.category.charAt(0).toUpperCase() + product.category.slice(1))}</Badge>
                        </TableCell>
                        <TableCell>{product.section_number}</TableCell>
                        <TableCell>{product.shelf_number}</TableCell>
                        <TableCell>
                            <Badge variant={product.is_available ? 'default' : 'destructive'}>
                                {product.is_available ? t('Available') : t('Out of Stock')}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => router.get('/dashboard/products/' + product.id + '/edit')}
                            >
                                {t('Edit')}
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(product.id, product.name)}
                            >
                                {t('Delete')}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
