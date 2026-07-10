import api from '@/lib/api';
import type { StoreData } from '../types/store.types';
import type { Perfume } from '@/lib/api';

export const storeApi = {
    getStore: (slug: string) =>
        api.get<{ data: StoreData }>('/stores/' + slug).then(r => r.data.data),

    getStoreProducts: (slug: string, params?: Record<string, string>) =>
        api.get<{ data: Perfume[] }>('/stores/' + slug + '/products', { params }).then(r => r.data.data),
};