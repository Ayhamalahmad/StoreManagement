import type { Season } from '@/features/Seasons/types';
import type { FragranceCategory } from '@/features/FragranceCategories/types';

export interface Perfume {
    id: number;
    name: Record<string, string>;
    code: string;
    original_perfume: Record<string, string> | null;
    image: string | null;
    image_url: string | null;
    seasons: Season[];
    fragrance_categories: FragranceCategory[];
    family: Record<string, string> | null;
    shelf: string | null;
    section: string | null;
    notes: Record<string, string> | null;
    top_notes: Record<string, string> | null;
    middle_notes: Record<string, string> | null;
    base_notes: Record<string, string> | null;
    warehouse: string | null;
    concentration: Record<string, string> | null;
    sillage: Record<string, string> | null;
    price: number | null;
    created_at: string;
}

export interface PerfumeFormData {
    name: Record<string, string>;
    code: string;
    original_perfume: Record<string, string>;
    image: File | null;
    imagePreview: string;
    family: Record<string, string>;
    shelf: string;
    section: string;
    notes: Record<string, string>;
    top_notes: Record<string, string>;
    middle_notes: Record<string, string>;
    base_notes: Record<string, string>;
    warehouse: string;
    concentration: Record<string, string>;
    sillage: Record<string, string>;
    price: string;
    season_ids: number[];
    fragrance_category_ids: number[];
}
