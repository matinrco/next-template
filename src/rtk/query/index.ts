import type { PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "@/rtk/store";
import { baseQuery } from "./baseQuery";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Posts"],
    baseQuery,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractRehydrationInfo: (action, { reducerPath }): any => {
        if (action.type === HYDRATE) {
            return (action as PayloadAction<RootState>).payload[reducerPath];
        }
    },
    endpoints: () => ({}),
});
