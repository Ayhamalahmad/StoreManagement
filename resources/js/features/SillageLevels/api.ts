import { router } from '@inertiajs/react';
import type { SillageLevelFormData } from './types';

export const createSillageLevel = (data: SillageLevelFormData) => {
    router.post(route('sillage-levels.store'), data);
};

export const updateSillageLevel = (id: number, data: SillageLevelFormData) => {
    router.put(route('sillage-levels.update', id), data);
};

export const deleteSillageLevel = (id: number) => {
    router.delete(route('sillage-levels.destroy', id));
};
