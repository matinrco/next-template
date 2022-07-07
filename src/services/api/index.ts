import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "src/services/store";
import {
    GetWeatherRequest,
    GetWeatherResponse,
    GetWeatherANSIRequest,
    GetWeatherANSIResponse,
    CreateFooRequest,
    CreateFooResponse,
} from "./types";

export const api = createApi({
    reducerPath: "api",
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            /**
             * you can modify headers here,
             */
            const {} = getState() as RootState;
            // headers.set("sampleHeader", "sampleValue");
            return headers;
        },
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        createFoo: builder.mutation<CreateFooResponse, CreateFooRequest>({
            query: (body) => ({
                url: "foo-endpoint",
                method: "POST",
                body,
            }),
        }),
        getWeather: builder.query<GetWeatherResponse, GetWeatherRequest>({
            query: ({ city }) => `https://wttr.in/${city}?format=j1`,
        }),
        getWeatherANSI: builder.query<
            GetWeatherANSIResponse,
            GetWeatherANSIRequest
        >({
            query: ({ city }) => ({
                url: "weather/sample-ansi.html",
                responseHandler: "text",
            }),
        }),
    }),
});
