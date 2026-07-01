export interface Season {
    id: number;
    name: Record<string, string>;
    slug: string;
    created_at: string;
}

export interface SeasonFormData {
    name: Record<string, string>;
    slug: string;
}
