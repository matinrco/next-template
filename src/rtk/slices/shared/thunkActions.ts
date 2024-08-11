import { AppThunk } from "@/rtk/store";
import { postApis } from "@/rtk/query/post";
import { actions as sharedActions } from "../shared";
import { State as SharedState } from "./state";

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

export const createPost =
    ({
        title,
        body,
        userId,
    }: Parameters<
        typeof postApis.endpoints.createPost.initiate
    >[0]): AppThunk =>
    async (dispatch, getState) => {
        try {
            const response = await dispatch(
                postApis.endpoints.createPost.initiate(
                    { title, body, userId },
                    { fixedCacheKey: "create-post" },
                ),
            ).unwrap();
        } catch (error) {}
    };
