import {
    configureStore,
    Action,
    ThunkAction,
    ImmutableStateInvariantMiddlewareOptions,
    SerializableStateInvariantMiddlewareOptions,
    createAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { api } from "src/services/api";
import { reducer as sharedReducer } from "src/services/slices/shared";

interface ThunkOptions<E> {
    extraArgument: E;
}

interface DefaultMiddlewareOptions {
    thunk?: boolean | ThunkOptions<Context>;
    immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions;
    serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions;
}

export const makeStore = (context: Context) =>
    configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            shared: sharedReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware<DefaultMiddlewareOptions>({
                thunk: {
                    extraArgument: context,
                },
            }).concat(api.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const APP_HYDRATE = createAction<RootState>(HYDRATE);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: process.env.NODE_ENV === "development",
});
