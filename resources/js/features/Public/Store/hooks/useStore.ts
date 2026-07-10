import { useQuery } from '@tanstack/react-query';
import { storeApi } from '../api/store.api';
import { STORE_QUERY_KEYS } from '../constants/store.constants';

export function useStore(slug: string) {
    return useQuery({
        queryKey: STORE_QUERY_KEYS.detail(slug),
        queryFn: () => storeApi.getStore(slug),
        enabled: !!slug,
    });
}

export function useStoreProducts(slug: string, filters?: Record<string, string>) {
    return useQuery({
        queryKey: STORE_QUERY_KEYS.productList(slug, filters ?? {}),
        queryFn: () => storeApi.getStoreProducts(slug, filters),
        enabled: !!slug,
    });
}