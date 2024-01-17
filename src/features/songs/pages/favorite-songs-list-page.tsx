import useLocalStorage from 'use-local-storage';
import { favoriteSongsKey, FavoriteSongsType } from '@/types/local-storage';

export const FavoriteSongsListPage: React.FC = () => {
	const [favoriteSongs] = useLocalStorage<FavoriteSongsType>(favoriteSongsKey, {});


	return <></>;
};