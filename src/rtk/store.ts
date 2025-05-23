import {
    type ThunkAction,
    type UnknownAction,
    type ActionCreatorInvariantMiddlewareOptions,
    type ImmutableStateInvariantMiddlewareOptions,
    type SerializableStateInvariantMiddlewareOptions,
    configureStore,
    createAction,
    combineSlices,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { type Context, createWrapper, HYDRATE } from "next-redux-wrapper";
import { api } from "@/rtk/query";
import { slice as sharedSlice } from "./slices/shared";

type ThunkOptions<E> = {
    extraArgument: E;
};

type DefaultMiddlewareOptions = {
    thunk?: boolean | ThunkOptions<Context>;
    immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
    serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
    actionCreatorCheck?: boolean | ActionCreatorInvariantMiddlewareOptions;
};

/**
 * we need to create APP_HYDRATE before calling combineSlices
 * cuz we use APP_HYDRATE in slices
 */
export const APP_HYDRATE = createAction<RootState>(HYDRATE);

const reducer = combineSlices(api, sharedSlice);

const makeStore = (context: Context) =>
    configureStore({
        reducer,
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

// use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: false,
});
