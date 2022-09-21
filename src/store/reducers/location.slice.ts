import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Location} from "../../services/WeatherService";

const initialState: Location = {
    lon: 53.826597000000014,
    lat:  27.202148,
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Location>) => {
            state.lon = action.payload.lon;
            state.lat = action.payload.lat;
        },
        resetLocation: state => {
            state.lon = initialState.lon;
            state.lat = initialState.lat;
        }
    }
})

export const {
    setLocation,
    resetLocation
} = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
