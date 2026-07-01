import { router } from '@inertiajs/react';
import type { SeasonFormData } from './types';

export const createSeason = (data: SeasonFormData) => {
    router.post(route('seasons.store'), data);
};

export const updateSeason = (id: number, data: SeasonFormData) => {
    router.put(route('seasons.update', id), data);
};

export const deleteSeason = (id: number) => {
    router.delete(route('seasons.destroy', id));
};
