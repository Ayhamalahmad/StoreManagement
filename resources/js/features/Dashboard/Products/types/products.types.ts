import type { Perfume } from '@/lib/api';

export interface ProductData extends Perfume {}

export interface ProductFormData {
    code: string;
    name: string;
    brand: string;
    inspired_by?: string;
    gender: string;
    category: string;
    description?: string;
    top_notes?: string;
    middle_notes?: string;
    base_notes?: string;
    section_number: number;
    shelf_number: number;
    is_available: boolean;
    perfume_image?: File | string | null;
    inspired_image?: File | string | null;
    perfume_image_preview?: string;
    inspired_image_preview?: string;
}

export interface ProductsPageProps {
    products: ProductData[];
    filters: {
        search?: string;
        gender?: string;
        category?: string;
    };
}

export interface ProductPageProps {
    product: ProductData;
}