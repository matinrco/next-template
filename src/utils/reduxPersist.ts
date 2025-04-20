import { isEqual, mergeWith } from "lodash";
import type { Slice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem: () => {
            return Promise.resolve(null);
        },
        setItem: (_key: string, value: unknown) => {
            return Promise.resolve(value);
        },
        removeItem: () => {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const createStateReconciler =
    (initialState: { [key: string]: unknown }) =>
    (inboundState: unknown, originalState: unknown, reducedState: unknown) => {
        /**
         * inboundState: state from persisted storage
         * reducedState: value from reducer. aka server hydrated value which has the highest priority.
         * initialState: slice initial state.
         *
         * example:
         * inboundState { counter: 5, city: "isfahan" }
         * reducedState { counter: 0, city: "tehran"}
         * initialState { counter: 0, city: ""}
         *
         * final result should be { counter: 5, city: "tehran" }
         */

        return mergeWith(
            {},
            inboundState,
            reducedState,
            (persistedValue, serverValue, key) => {
                // if server value is different from initial state, use server value
                if (!isEqual(serverValue, initialState[key])) {
                    return serverValue;
                }
                // otherwise use persisted value
                return persistedValue;
            },
        );
    };

export const createPersistedSlice = <T extends Slice>(
    slice: T,
    sliceName: string,
    initialState: { [key: string]: unknown },
): T => {
    return {
        ...slice,
        reducer:
            typeof window !== "undefined"
                ? (persistReducer(
                      {
                          key: sliceName,
                          storage,
                          stateReconciler: createStateReconciler(initialState),
                      },
                      slice.reducer,
                  ) as unknown as typeof slice.reducer)
                : slice.reducer,
    };
};
