import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE, Context } from "next-redux-wrapper";
import queryString from "query-string";
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

            /**
             * forward all client headers to api when fetching in server side
             */
            if (typeof window === "undefined") {
                if (
                    "req" in context &&
                    context.req &&
                    "headers" in context.req &&
                    context.req.headers
                ) {
                    Object.entries(context.req.headers).map(([k, v]) => {
                        if (typeof v === "string") {
                            headers.set(k, v);
                        }
                    });
                }
                /**
                 * set host header to api host name instead of client/browser host header.
                 * if not, reverse proxies can't select upstream correctly.
                 */
                try {
                    const apiBaseUrl = new URL(
                        process.env.NEXT_PUBLIC_API_BASE_URL || "",
                    );
                    headers.set("host", apiBaseUrl.host);
                } catch (error) {}
            }

            return headers;
        },
        paramsSerializer: (params) => {
            return queryString.stringify(params);
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
