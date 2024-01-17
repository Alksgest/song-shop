import { Song } from '@/types/models';

export type FavoriteSong = Song & { isFavorite: boolean };