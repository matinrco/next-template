import {
    configureStore,
    ThunkAction,
    ImmutableStateInvariantMiddlewareOptions,
    SerializableStateInvariantMiddlewareOptions,
    createAction,
    UnknownAction,
    combineSlices,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { api } from "@/rtk/query";
import { slice as sharedSlice } from "./slices/shared";

type ThunkOptions<E> = {
    extraArgument: E;
};

type DefaultMiddlewareOptions = {
    thunk?: boolean | ThunkOptions<Context>;
    immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
    serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
};

/**
 * we need to create APP_HYDRATE before calling combineSlices
 * cuz we use APP_HYDRATE in slices
 */
export const APP_HYDRATE = createAction<RootState>(HYDRATE);

export const rootReducer = combineSlices(api, sharedSlice);

const makeStore = (context: Context) =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware<DefaultMiddlewareOptions>({
                thunk: {
                    extraArgument: context,
                },
            }).concat(api.middleware),
    });

type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    UnknownAction
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: false,
});
