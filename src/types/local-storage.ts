export type FavoriteSongsType = {
	[key: string]: {
		addingDate: Date;
	} | null;
};

export const favoriteSongsKey = 'favoriteSongs';
