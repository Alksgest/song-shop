import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import React, { useEffect, useState } from 'react';
import { artistApiClient } from '@/api/artist-api-client';
import { SongsList } from '@/features/shared/components/songs-list';
import { FavoriteSong } from '@/types/ui';

type SongWithDate = FavoriteSong & { addingDate: Date };

async function getSongs(favoriteSongs: FavoriteSongsType): Promise<SongWithDate[]> {
	const keys = Object.keys(favoriteSongs);
	const promises: Promise<SongWithDate>[] = [];

	const loadedSongs: SongWithDate[] = [];

	for (const key of keys) {
		if (!favoriteSongs[key]) {
			continue;
		}

		const [artistId, songId] = key.split('_');
		const addingDate = favoriteSongs[key]!.addingDate;

		const song: SongWithDate = await artistApiClient
			.getSongById(artistId, songId)
			.then((song) => {
				return {
					...song,
					isFavorite: true,
					addingDate,
				};
			});

		loadedSongs.push(song);

		// because of API limitation
		// await new Promise(resolve => setTimeout(resolve, 600));
	}

	// unfortunately with this API it is impossible to do with promise all.
	// const songs = await Promise.all(promises);

	return loadedSongs
		.toSorted((a, b) => +a.addingDate - +b.addingDate);
}

export const FavoriteSongsListPage: React.FC = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [songs, setSongs] = useState<SongWithDate[]>([]);
	const [favoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	useEffect(() => {
		if (isLoaded) {
			return;
		}

		getSongs(favoriteSongs).then(data => {
			setSongs(data);
		});
		setIsLoaded(() => true);
	}, [favoriteSongs, isLoaded]);

	return <SongsList songs={songs} displayArtistName/>;
};