import { useMemo } from 'react';
import { Song } from '@/types/models';
import { artistApiClient } from '@/api/artist-api-client';
import { SongsList } from '@/features/shared/components/songs-list';
import { generateSongKeyInLocalStorage } from '@/utils';
import { useNotStrictPaginationApi } from '@/hooks';
import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';
import { CommonLoader } from '@/ui/molecules/common-loader';

const elementsPerPage = 5;

type Props = {
	artistId?: string;
};

export const SongsBlock: React.FC<Props> = ({ artistId }) => {
	const getDataFunc = useMemo(() => {
		return artistApiClient.getArtistsSongs.bind(artistApiClient);
	}, []);

	const getDataParams = useMemo(() => {
		return [artistId];
	}, [artistId]);

	const [data, currentPage, setCurrentPage, hasNext, hasPrev, isLoading] =
		useNotStrictPaginationApi<Song>(getDataFunc, elementsPerPage, true, getDataParams);

	const [favoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});

	const songs = useMemo(() => {
		if (!data) {
			return [];
		}

		const songs = data.map((el) => {
			const favorite = { ...el, isFavorite: false };
			const key = generateSongKeyInLocalStorage(el.artistId, el.id);
			if (!!favoriteSongs[key]) {
				favorite.isFavorite = true;
			}
			return favorite;
		});

		return songs;
	}, [favoriteSongs, data]);

	if (!artistId) {
		return <></>;
	}

	return (
		<CommonLoader isLoading={isLoading}>
			<SongsList
				songs={songs}
				paginationParams={{ currentPage, setCurrentPage, hasPrev, hasNext }}
			/>
		</CommonLoader>
	);
};
