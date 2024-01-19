import { AppSettingsState, ArtistsState } from '@/redux/state';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { artistApiClient } from '@/api/artist-api-client';

const initialState: AppSettingsState = {
	title: '',
};

export const appSettingsSlice = createSlice({
	name: 'app-settings',
	initialState,
	reducers: {
		setAppTitle: (state, action) => {
			state.title = action.payload;
		},
	},
});

export const { setAppTitle } =
	appSettingsSlice.actions;

export const appSettingsReducer = appSettingsSlice.reducer;