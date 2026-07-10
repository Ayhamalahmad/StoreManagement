export const PRODUCTS_QUERY_KEYS = {
    all: ['products'] as const,
    lists: () => [...PRODUCTS_QUERY_KEYS.all, 'list'] as const,
    list: (filters: Record<string, string>) => [...PRODUCTS_QUERY_KEYS.lists(), filters] as const,
    details: () => [...PRODUCTS_QUERY_KEYS.all, 'detail'] as const,
    detail: (code: string) => [...PRODUCTS_QUERY_KEYS.details(), code] as const,
    admin: () => [...PRODUCTS_QUERY_KEYS.all, 'admin'] as const,
};

export const PRODUCTS_CONFIG = {
    defaultPerPage: 50,
    debounceMs: 300,
} as const;

export const GENDER_OPTIONS = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'unisex', label: 'Unisex' },
] as const;

export const CATEGORY_OPTIONS = [
    { value: 'designer', label: 'Designer' },
    { value: 'niche', label: 'Niche' },
    { value: 'nishe', label: 'Nishe' },
] as const;