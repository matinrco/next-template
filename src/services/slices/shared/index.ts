import { createSlice } from "@reduxjs/toolkit";
import { APP_HYDRATE } from "src/services/store";
import { initialState } from "./state";
import * as reducers from "./reducers";
import * as thunkActions from "./thunkActions";

const sharedSlice = createSlice({
    name: "shared",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(APP_HYDRATE, (state, action) => ({
            ...state,
            ...action.payload.shared,
        }));
    },
});

export const actions = { ...sharedSlice.actions, ...thunkActions };
export const reducer = sharedSlice.reducer;
