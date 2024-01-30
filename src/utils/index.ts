import { Song } from '@/types/models';

export function generateSongKeyInLocalStorage(artistId: string, songId: string): string {
	return `${artistId}_${songId}`;
}
