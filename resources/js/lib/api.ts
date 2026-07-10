import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const getToken = () => localStorage.getItem('token');

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export interface Perfume {
    id: number;
    code: string;
    name: string;
    brand: string;
    inspired_by: string | null;
    gender: 'men' | 'women' | 'unisex';
    category: 'designer' | 'niche' | 'nishe';
    description: string | null;
    top_notes: string | null;
    middle_notes: string | null;
    base_notes: string | null;
    section_number: number;
    shelf_number: number;
    is_available: boolean;
    perfume_image: string | null;
    perfume_image_full: string | null;
    inspired_image: string | null;
    inspired_image_full: string | null;
}

export interface PerfumeFormData {
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
    perfume_image?: File;
    inspired_image?: File;
}

export const fetchPerfumes = (params?: Record<string, string>) =>
    api.get<{ data: Perfume[] }>('/perfumes', { params }).then(r => r.data.data);

export const fetchPerfume = (code: string) =>
    api.get<{ data: Perfume }>('/perfumes/' + code).then(r => r.data.data);

export const createPerfume = (data: FormData) =>
    api.post<{ data: Perfume }>('/admin/perfumes', data).then(r => r.data.data);

export const updatePerfume = (id: number, data: FormData) =>
    api.post<{ data: Perfume }>('/admin/perfumes/' + id, { ...data, _method: 'PUT' }).then(r => r.data.data);

export const deletePerfume = (id: number) =>
    api.delete('/admin/perfumes/' + id);

export const login = (email: string, password: string) =>
    api.post<{ token: string }>('/login', { email, password }).then(r => r.data.token);

export default api;