import { Artist } from '@/types/models';

export type ArtistsState = {
	data: Artist[];
	isLoaded: boolean;
	isLoading: boolean;
};

export type AppSettingsState = {
	title: string;
};
