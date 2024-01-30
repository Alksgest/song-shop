import { AppSettingsState } from '@/redux/types';
import { createSlice } from '@reduxjs/toolkit';

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

export const { setAppTitle } = appSettingsSlice.actions;

export const appSettingsReducer = appSettingsSlice.reducer;
