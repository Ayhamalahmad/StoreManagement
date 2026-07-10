import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/products.api';
import { PRODUCTS_QUERY_KEYS } from '../constants/products.constants';
import type { ProductData } from '../types/products.types';

export function useProducts(filters?: Record<string, string>) {
    return useQuery({
        queryKey: PRODUCTS_QUERY_KEYS.list(filters ?? {}),
        queryFn: () => productsApi.fetchAll(filters),
    });
}

export function useProduct(code: string) {
    return useQuery({
        queryKey: PRODUCTS_QUERY_KEYS.detail(code),
        queryFn: () => productsApi.fetchByCode(code),
        enabled: !!code,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.admin() });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: FormData }) => productsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.details() });
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.admin() });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => productsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.lists() });
            queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEYS.admin() });
        },
    });
}