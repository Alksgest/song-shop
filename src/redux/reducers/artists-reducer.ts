import { ArtistsState } from '@/redux/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { artistApiClient } from '@/api/artist-api-client';

const initialState: ArtistsState = {
	data: [],
	isLoaded: false,
	isLoading: false,
};

export const artistsSlice = createSlice({
	name: 'artists',
	initialState,
	reducers: {
		setIsArtistsLoading: (state) => {
			state.isLoading = true;
			state.isLoaded = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(refetchArtists.fulfilled, (state, action) => {
			state.data = action.payload || [];
			state.isLoaded = true;
			state.isLoading = false;
		});
	},
});

export const refetchArtists = createAsyncThunk('artists/refetchArtists', async () => {
	try {
		return await artistApiClient.getArtistList();
	} catch (e: unknown) {
		console.error((e as { message: unknown }).message);
		return null;
	}
});

export const { setIsArtistsLoading } = artistsSlice.actions;

export const artistsReducer = artistsSlice.reducer;
