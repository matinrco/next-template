import { createSlice } from "@reduxjs/toolkit";
import { APP_HYDRATE } from "@/rtk/store";
import { initialState } from "./state";
import * as reducers from "./reducers";
import * as thunkActions from "./thunkActions";

const sliceName = "shared";

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder.addCase(APP_HYDRATE, (state, action) => ({
            ...state,
            ...action.payload[sliceName],
        }));
    },
});

export { slice, thunkActions };
