import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '@/redux/reducers/artists-reducer';
import { appSettingsReducer } from '@/redux/reducers/app-settings-reducer';

export const store = configureStore({
	reducer: {
		artists: artistsReducer,
		appSettings: appSettingsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
