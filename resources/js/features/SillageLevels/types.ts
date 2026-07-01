export interface SillageLevel {
    id: number;
    name: Record<string, string>;
    slug: string;
    created_at: string;
}

export interface SillageLevelFormData {
    name: Record<string, string>;
    slug: string;
}
