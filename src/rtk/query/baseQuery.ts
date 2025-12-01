import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import queryString from "query-string";
import type { Context } from "next-redux-wrapper";
import type { RootState } from "@/rtk/store";
// import { api } from "@/rtk/query";
import { isServer } from "@/utils/environment";

const mutex = new Mutex();

const genericBaseQuery = fetchBaseQuery({
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
        if (isServer) {
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
            } catch (error) {
                //
            }
        }

        return headers;
    },
    paramsSerializer: (params) => {
        return queryString.stringify(params);
    },
});

/**
 * do any action base on any api call & response
 * for example, you can handle authentication errors here or anything else
 */
export const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) => {
    /**
     * in order to do a one-time job if some conditions meet, (e.g 401 happened)
     * here wait until the mutex is available without locking it
     */
    await mutex.waitForUnlock();

    /**
     * do the api call
     * its the main action & thats why we are here
     */
    let result = await genericBaseQuery(args, baseQueryApi, extraOptions);

    /**
     * handle unauthorized error
     */
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            // you can do another api call
            // const otherResult = await genericBaseQuery(
            //     "/some-path",
            //     baseQueryApi,
            //     extraOptions,
            // );

            // you can also dispatch any action
            // baseQueryApi.dispatch(someAction(data));

            // you can invalidate any data from cache
            // baseQueryApi.dispatch(api.util.invalidateTags(["SampleTag"]));

            // you can redirect to somewhere else
            // router.push("/");

            /**
             * don't forget to release the mutex after awaiting all async actions.
             * release must be called once the mutex should be released again.
             */
            release();
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await genericBaseQuery(args, baseQueryApi, extraOptions);
        }
    }

    // pass the result
    return result;
};
