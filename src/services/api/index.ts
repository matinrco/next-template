import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import baseQuery from "./baseQuery";
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
    baseQuery,
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
            query: ({ city }) => ({
                url: `https://wttr.in/${city}?format=j1`,
                credentials: "omit",
            }),
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
