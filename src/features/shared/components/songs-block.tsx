import { useEffect, useMemo, useState } from 'react';
import { Song } from '@/types/models';
import { artistApiClient } from '@/api/artist-api-client';
import { SongsList } from '@/features/shared/components/songs-list';
import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import { FavoriteSong } from '@/types/ui';
import { generateSongKeyInLocalStorage } from '@/util';


const elementsPerPage = 5;

type Props = {
	artistId?: string;
}

export const SongsBlock: React.FC<Props> = ({ artistId }) => {
	const [rawSongs, setRawSongs] = useState<Song[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [favoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	useEffect(() => {
		if (!artistId) {
			return;
		}

		artistApiClient
			.getSongListPage(artistId, currentPage, elementsPerPage)
			.then((data) => {
				setRawSongs(data);
			});
	}, [artistId, currentPage]);

	const songs = useMemo(() => {
		return rawSongs.map(el => {
			const favorite = { ...el, isFavorite: false };
			const key = generateSongKeyInLocalStorage(el.artistId, el.id);
			if (!!favoriteSongs[key]) {
				favorite.isFavorite = true;
			}
			return favorite;
		});
	}, [favoriteSongs, rawSongs]);

	if (!artistId) {
		return <></>;
	}

	return (
		<>
			<SongsList songs={songs} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	);
};