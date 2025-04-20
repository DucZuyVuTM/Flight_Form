import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightFormState {
    departure: string;
    destination: string;
    date: string;
}

const initialState: FlightFormState = {
    departure: '',
    destination: '',
    date: '',
};

const flightFormSlice = createSlice({
    name: 'flightForm',
    initialState,
    reducers: {
        updateDeparture(state, action: PayloadAction<string>) {
            state.departure = action.payload;
        },
        updateDestination(state, action: PayloadAction<string>) {
            state.destination = action.payload;
        },
        updateDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
        },
    },
    selectors: {
        selectDeparture: (state) => state.departure,
        selectDestination: (state) => state.destination,
        selectDate: (state) => state.date,
    },
});

export const { updateDeparture, updateDestination, updateDate } = flightFormSlice.actions;
export const { selectDeparture, selectDestination, selectDate } = flightFormSlice.selectors;
export default flightFormSlice.reducer;