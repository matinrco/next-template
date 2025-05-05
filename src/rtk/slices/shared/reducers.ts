import type { PayloadAction, Draft } from "@reduxjs/toolkit";
import type { State } from "./state";

export const updateCounter = (
    state: Draft<State>,
    action: PayloadAction<State["counter"]>,
) => {
    state.counter = action.payload;
};

export const updateCity = (
    state: Draft<State>,
    action: PayloadAction<State["city"]>,
) => {
    state.city = action.payload;
};
