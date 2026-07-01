import { router } from '@inertiajs/react';
import type { OilFormData } from './types';

export const createOil = (data: OilFormData) => {
    router.post(route('oils.store'), data);
};

export const updateOil = (id: number, data: OilFormData) => {
    router.put(route('oils.update', id), data);
};

export const deleteOil = (id: number) => {
    router.delete(route('oils.destroy', id));
};
