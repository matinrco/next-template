import type { PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "@/rtk/store";
import baseQuery from "./baseQuery";
import {
    GetWeatherReq,
    GetWeatherRes,
    CreatePostReq,
    CreatePostRes,
    GetPostsReq,
    GetPostsRes,
} from "./types";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Posts"],
    baseQuery,
    extractRehydrationInfo(action, { reducerPath }): any {
        if (action.type === HYDRATE) {
            return (action as PayloadAction<RootState>).payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        createPost: builder.mutation<CreatePostRes, CreatePostReq>({
            query: (body) => ({
                url: "posts",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Posts"],
        }),
        getPosts: builder.query<GetPostsRes, GetPostsReq>({
            query: () => "posts",
            providesTags: ["Posts"],
        }),
        getWeather: builder.query<GetWeatherRes, GetWeatherReq>({
            query: ({ city }) => ({
                url: `https://wttr.in/${city}?format=j1`,
                credentials: "omit",
            }),
        }),
    }),
});
