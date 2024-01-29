import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import React, { useEffect, useState } from 'react';
import { artistApiClient } from '@/api/artist-api-client';
import { SongsList } from '@/features/shared/components/songs-list';
import { FavoriteSong } from '@/types/ui';
import { setAppTitle } from '@/redux/reducers/app-settings-reducer';
import { useAppDispatch } from '@/redux/hooks';

type SongWithDate = FavoriteSong & { addingDate: Date };

const pageTitle = 'Favorites';

async function getSongs(favoriteSongs: FavoriteSongsType): Promise<SongWithDate[]> {
	const keys = Object.keys(favoriteSongs);

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
	}

	return loadedSongs
		.toSorted((a, b) => +a.addingDate - +b.addingDate);
}

export const FavoriteSongsListPage: React.FC = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [songs, setSongs] = useState<SongWithDate[]>([]);
	const [favoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setAppTitle(pageTitle));
	}, [dispatch]);

	useEffect(() => {
		if (isLoaded) {
			return;
		}

		getSongs(favoriteSongs).then(data => {
			setSongs(data);
		});
		setIsLoaded(() => true);
	}, [favoriteSongs, isLoaded]);

	return <SongsList songs={songs} displayArtistName />;
};