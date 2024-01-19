import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import { PaginationController } from '@/ui/molecules';
import { SongLine } from '@/features/shared/components/song-line';
import { FavoriteSong } from '@/types/ui';
import { generateSongKeyInLocalStorage } from '@/util';

type Props = {
	songs: FavoriteSong[];
	displayArtistName?: boolean;
	withAuthorName?: boolean;
	currentPage?: number;
	setCurrentPage?: Dispatch<SetStateAction<number>>
}

export const SongsList: React.FC<Props> = ({
	 songs,
	 currentPage,
	 setCurrentPage,
	 displayArtistName,
 }) => {
	const [favoriteSongs, setFavoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	const toggleSong = useCallback((artistId: string, songId: string) => {
		if (!artistId || !songId) {
			return;
		}

		const key = generateSongKeyInLocalStorage(artistId, songId);

		const copy = { ...favoriteSongs };
		if (!copy[key]) {
			copy[key] = { addingDate: new Date() };
		} else {
			copy[key] = null;
		}

		setFavoriteSongs(copy);
	}, [favoriteSongs, setFavoriteSongs]);

	const songsBlock = useMemo(() => {
		if (!songs) {
			return <></>;
		}
		return songs.map((el) => {
			const key = generateSongKeyInLocalStorage(el.artistId, el.id);
			const isFavorite = !!favoriteSongs[key];
			return <SongLine key={key} song={el} toggleSong={toggleSong} displayArtistName={displayArtistName} />;
		});
	}, [displayArtistName, favoriteSongs, songs, toggleSong]);

	return (
		<>
			<div>{songsBlock}</div>
			{currentPage && setCurrentPage && (
				<PaginationController currentPage={currentPage} setPage={(page) => setCurrentPage(page)} />
			)}
		</>
	);
};