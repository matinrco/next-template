import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import * as reducers from "./reducers";
import * as thunkActions from "./thunkActions";

const sharedSlice = createSlice({
    name: "shared",
    initialState,
    reducers,
});

export const actions = { ...sharedSlice.actions, ...thunkActions };
export const reducer = sharedSlice.reducer;
