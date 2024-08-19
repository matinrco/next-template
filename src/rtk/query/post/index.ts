import { api } from "@/rtk/query";
import {
    CreatePostReq,
    CreatePostRes,
    GetPostsReq,
    GetPostsRes,
} from "./types";

export const postApis = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<CreatePostRes, CreatePostReq>({
            query: (body) => ({
                url: "/posts",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Posts"],
        }),
        getPosts: builder.query<GetPostsRes, GetPostsReq>({
            query: () => "/posts",
            providesTags: ["Posts"],
        }),
    }),
    overrideExisting: false,
});
