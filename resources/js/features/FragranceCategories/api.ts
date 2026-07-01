import { router } from '@inertiajs/react';
import type { FragranceCategoryFormData } from './types';

export const createCategory = (data: FragranceCategoryFormData) => {
    router.post(route('fragrance-categories.store'), data);
};

export const updateCategory = (id: number, data: FragranceCategoryFormData) => {
    router.put(route('fragrance-categories.update', id), data);
};

export const deleteCategory = (id: number) => {
    router.delete(route('fragrance-categories.destroy', id));
};
