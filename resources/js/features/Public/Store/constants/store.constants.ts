export const STORE_QUERY_KEYS = {
    all: ['stores'] as const,
    detail: (slug: string) => [...STORE_QUERY_KEYS.all, slug] as const,
    products: (slug: string) => [...STORE_QUERY_KEYS.detail(slug), 'products'] as const,
    productList: (slug: string, filters: Record<string, string>) =>
        [...STORE_QUERY_KEYS.products(slug), filters] as const,
};

export const STORE_CONFIG = {
    defaultPerPage: 50,
} as const;