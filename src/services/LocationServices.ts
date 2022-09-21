import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export interface Location {
    name: string,
    local_names: {
        ru: string,
        ascii: string,
        feature_name: string,
        be: string,
        pl: string
    },
    lat: number,
    lon: number,
    country: string,
    state: string
}

export const locationAPI = createApi({
    reducerPath: 'locationAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://api.openweathermap.org/geo/1.0'}),
    endpoints: (build) => ({
        getLocation: build.query<Location[], string>({
            query: (locationNane) => ({
                url: `/direct`,
                params: {
                    q: locationNane,
                    limit: 5,
                    appid: process.env.REACT_APP_SECRET_CODE
                }
            })
        })
    })
});
