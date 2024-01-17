import { useCallback, useEffect, useMemo, useState } from 'react';
import { PaginatedList } from '@/types/paginated-list';
import { Song } from '@/types/models';
import { artistApiClient } from '@/api/artist-api-client';
import { SongLine } from '@/features/shared/components';
import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import { PaginationController } from '@/ui/molecules/pagination-controller';


const elementsPerPage = 5;

type Props = {
	artistId?: string;
}

export const SongsBlock: React.FC<Props> = ({ artistId }) => {
	const [songs, setSongs] = useState<PaginatedList<Song>>();
	const [currentPage, setCurrentPage] = useState(1);

	const [favoriteSongs, setFavoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	const toggleSong = useCallback((artistId: string, songId: string) => {
		const key = `${artistId}_${songId}`;

		const copy = { ...favoriteSongs };
		if (!copy[key]) {
			copy[key] = { addingDate: new Date() };
		} else {
			copy[key] = null;
		}

		setFavoriteSongs(copy);
	}, [favoriteSongs, setFavoriteSongs]);

	useEffect(() => {
		if (!artistId) {
			return;
		}

		artistApiClient.getSongListPage(artistId, currentPage, elementsPerPage)
			.then((data) => {
				setSongs(data);
			});
	}, [artistId, currentPage]);

	const songsBlock = useMemo(() => {
		if (!songs) {
			return <></>;
		}

		return songs.data.map((el) => {
			const key = `${artistId}_${el.id}`;
			const isFavorite = !!favoriteSongs[key];
			return <SongLine key={el.id} song={el} isFavorite={isFavorite} toggleSong={toggleSong} />;
		});
	}, [artistId, favoriteSongs, songs, toggleSong]);

	if (!artistId) {
		return <></>;
	}

	return (
		<>
			<div>{songsBlock}</div>
			<PaginationController currentPage={currentPage} setPage={(page) => setCurrentPage(page)} />
		</>
	);
};