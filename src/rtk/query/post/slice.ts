import type { PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { baseQuery } from "@/rtk/query/baseQuery";
import type { RootState } from "@/rtk/store";

export const slice = createApi({
    reducerPath: "postApi",
    tagTypes: ["Posts"],
    baseQuery,
    // to prevent circular type issues, the return type needs to be annotated as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractRehydrationInfo: (action, { reducerPath }): any => {
        if (action.type === HYDRATE) {
            return (action as PayloadAction<RootState>).payload[reducerPath];
        }
    },
    endpoints: () => ({}),
});
