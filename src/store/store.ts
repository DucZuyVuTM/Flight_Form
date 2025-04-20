import { configureStore } from '@reduxjs/toolkit';
import flightFormReducer from '../slices/flightFormSlice';

export const store = configureStore({
    reducer: {
        flightForm: flightFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;