import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE, Context } from "next-redux-wrapper";
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
        credentials: "include",
        prepareHeaders: (headers, { getState, extra }) => {
            /**
             * you can modify headers here,
             */
            const {} = getState() as RootState;
            const context = extra as Context;

            if (typeof window !== "undefined") {
                return headers;
            } else {
                let reqCookies: Partial<{ [key: string]: string }> = {};
                if (
                    "req" in context &&
                    context.req &&
                    "cookies" in context.req &&
                    context.req.cookies
                ) {
                    reqCookies = context.req.cookies;
                }
                const cookieValue = Object.entries(reqCookies)
                    .map(([k, v]) => `${k}=${v}`)
                    .join("; ");
                headers.set("cookie", cookieValue);
                return headers;
            }
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
