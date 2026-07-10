import type { Perfume } from '@/lib/api';

export interface StoreData {
    id: number;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    logo_full?: string;
    banner?: string;
    banner_full?: string;
    primary_color?: string;
    secondary_color?: string;
    is_active: boolean;
}

export interface StorePageProps {
    store: StoreData;
    products: Perfume[];
    filters: {
        search?: string;
        gender?: string;
        category?: string;
        section_number?: string;
        shelf_number?: string;
        is_available?: string;
        per_page?: string;
    };
    sections?: number[];
    shelves?: number[];
}