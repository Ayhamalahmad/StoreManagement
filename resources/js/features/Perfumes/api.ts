import api from '@/lib/axios';
import type { PerfumeFormData } from './types';

export const createPerfume = (data: PerfumeFormData) => {
    return api.post(route('perfumes.store'), data);
};

export const updatePerfume = (id: number, data: PerfumeFormData) => {
    return api.put(route('perfumes.update', id), data);
};

export const deletePerfume = (id: number) => {
    return api.delete(route('perfumes.destroy', id));
};
