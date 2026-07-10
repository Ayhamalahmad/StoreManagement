import api from '@/lib/api';
import type { ProductData } from '../types/products.types';

export const productsApi = {
    fetchAll: (params?: Record<string, string>) =>
        api.get<{ data: ProductData[] }>('/perfumes', { params }).then(r => r.data.data),

    fetchByCode: (code: string) =>
        api.get<{ data: ProductData }>('/perfumes/' + code).then(r => r.data.data),

    fetchByStore: (storeSlug: string, params?: Record<string, string>) =>
        api.get<{ data: ProductData[] }>(storeSlug + '/products', { params }).then(r => r.data.data),

    create: (data: FormData) =>
        api.post<{ data: ProductData }>('/admin/perfumes', data).then(r => r.data.data),

    update: (id: number, data: FormData) =>
        api.post<{ data: ProductData }>('/admin/perfumes/' + id, { ...data, _method: 'PUT' }).then(r => r.data.data),

    delete: (id: number) =>
        api.delete('/admin/perfumes/' + id),
};