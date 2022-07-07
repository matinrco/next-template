import { AppThunk } from "src/services/store";
import { actions as sharedActions } from "../shared";
import { State as SharedState } from "./state";
import { api } from "src/services/api";

export const increment =
    (customValue?: number): AppThunk =>
    async (dispatch, getState) => {
        const { updateCounter } = sharedActions;
        dispatch(
            updateCounter(
                customValue ? customValue : getState().shared.counter + 1,
            ),
        );
    };

export const createFooWithThunk =
    (): AppThunk => async (dispatch, getState) => {
        try {
            const response = await dispatch(
                api.endpoints.createFoo.initiate(
                    {
                        foo: "bar",
                    },
                    { fixedCacheKey: "create-foo" },
                ),
            ).unwrap();
        } catch (error) {}
    };
