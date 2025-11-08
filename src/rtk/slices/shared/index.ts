import { mergeWith, isEqual } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { APP_HYDRATE } from "@/rtk/store";
import { type State, initialState } from "./state";
import * as reducers from "./reducers";
import * as thunkActions from "./thunkActions";

const sliceName = "shared";

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers,
    extraReducers: (builder) => {
        /**
         * Handles the special `HYDRATE` action dispatched by `next-redux-wrapper` during server-side rendering (SSR).
         * This action merges the server state into the client state during hydration for this slice.
         *
         * The goal is to preserve the client state while selectively merging any state changes from the server.
         *
         * - `state`: The current client-side Redux state.
         * - `action.payload[sliceName]`: The [sliceName] state sent from the server during SSR.
         *
         * This logic performs a dynamic comparison of each field in the server state against the initial state:
         *
         * 1. **Comparison Against Initial State**:
         *    - For each key in the server state, compare its value to the initial state's corresponding key.
         *    - If the server state field is different from the initial state, this indicates that the server has
         *      modified the field, and it should be merged into the client state.
         *    - If the server state field is the same as the initial state, the field hasn't been modified on the server,
         *      so we retain the client-side value.
         *
         * 2. **Merging Logic**:
         *    - Uses `lodash.mergeWith` to recursively merge the server and client states.
         *    - The custom merge function compares each field and decides whether to keep the client value or override it
         *      with the server value.
         *    - This prevents unnecessary overwrites of client state while ensuring any server-side modifications are correctly applied.
         *
         * 3. **Outcome**:
         *    - After hydration, only the fields that differ between the server state and initial state will be merged,
         *      ensuring that the client state is preserved unless a specific field was modified by the server.
         *
         * This approach ensures a balance between preserving client-side state and applying server-side updates during SSR hydration.
         */
        builder.addCase(APP_HYDRATE, (state, action) =>
            // mergeWith(object, ...sources, customizer)
            mergeWith(
                {},
                state,
                action.payload[sliceName],
                (clientValue, serverValue, key: keyof State) => {
                    // check if the server value differs from the initial value
                    if (!isEqual(serverValue, initialState[key])) {
                        // if server value is different from initial state, merge it
                        return serverValue;
                    }
                    // otherwise, keep the client state (clientValue)
                    return clientValue;
                },
            ),
        );
    },
});

export { slice, thunkActions };
