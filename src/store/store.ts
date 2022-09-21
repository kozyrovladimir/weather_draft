import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {weatherAPI} from "../services/WeatherService";

const rootReducer = combineReducers({
    [weatherAPI.reducerPath]: weatherAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(weatherAPI.middleware)
    })
}

//базовые типы для работы с нашим стором
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
