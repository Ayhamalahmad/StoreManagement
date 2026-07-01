export interface FragranceCategory {
    id: number;
    name: Record<string, string>;
    type: string;
    slug: string;
    created_at: string;
}

export interface FragranceCategoryFormData {
    name: Record<string, string>;
    type: string;
    slug: string;
}
