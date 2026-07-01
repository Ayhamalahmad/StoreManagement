export interface Oil {
    id: number;
    name: Record<string, string>;
    code: string;
    image: string | null;
    image_url: string | null;
    category: Record<string, string>;
    brand: string | null;
    volume: number | null;
    price: number | null;
    shelf: string | null;
    section: string | null;
    warehouse: string | null;
    notes: Record<string, string> | null;
    supplier: string | null;
    created_at: string;
}

export interface OilFormData {
    name: Record<string, string>;
    code: string;
    image: File | null;
    imagePreview: string;
    category: Record<string, string>;
    brand: string;
    volume: string;
    price: string;
    shelf: string;
    section: string;
    warehouse: string;
    notes: Record<string, string>;
    supplier: string;
}
