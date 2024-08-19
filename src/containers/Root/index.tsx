import { FormEvent } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/rtk/store";
import {
    slice as sharedSlice,
    thunkActions as sharedThunkActions,
} from "@/rtk/slices/shared";
import { weatherApis } from "@/rtk/query/weather";
import { postApis } from "@/rtk/query/post";
import { useFixNumbers } from "@/hooks/fixNumbers";

export const Root = () => {
    const { t } = useTranslation(["root", "common"]);
    const { increment, updateCity } = {
        ...sharedSlice.actions,
        ...sharedThunkActions,
    };
    const { counter, city } = useAppSelector((state) => state.shared);
    const dispatch = useAppDispatch();
    const fixNumbers = useFixNumbers();

    const {
        data: weather,
        isFetching: isWeatherFetching,
        isUninitialized: isWeatherUninitialized,
    } = weatherApis.useGetWeatherQuery({ city }, { skip: city.length === 0 });

    const [createPost, { data: postData }] = postApis.useCreatePostMutation();

    return (
        <>
            <Head>
                <title>{t("title")}</title>
            </Head>
            <div>
                <h1>{t("title")}</h1>
                <h2>{t("description")} &#58;&#41;</h2>
                <h3>{t("author")}</h3>
                <hr />
                <div>
                    <select
                        onChange={({ target }) =>
                            target.value.length !== 0 &&
                            dispatch(updateCity(target.value))
                        }
                        value={city}
                    >
                        <option value="tehran">{t("common:tehran")}</option>
                        <option value="isfahan">{t("common:isfahan")}</option>
                        <option value="gilan">{t("common:gilan")}</option>
                    </select>
                    <p>
                        {isWeatherFetching
                            ? "⌛"
                            : !isWeatherUninitialized &&
                              t("currentWeatherInCity", {
                                  replace: {
                                      city,
                                      weather: fixNumbers(
                                          weather?.current_condition?.[0]
                                              ?.temp_C || "---",
                                      ),
                                  },
                              })}
                    </p>
                </div>
                <hr />
                <div>
                    <button onClick={() => dispatch(increment())}>
                        increment
                    </button>
                    <p>current value is: {counter}</p>
                </div>
                <hr />
                {/* for sample mutation 👇 */}
                <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const title = (formData.get("title") || "") as string;
                        const userId = +(formData.get("userId") || 0);
                        const body = (formData.get("body") || "") as string;

                        createPost({ title, body, userId });
                    }}
                >
                    <div>
                        <input type="text" name="title" placeholder="title" />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="userId"
                            placeholder="user id"
                        />
                    </div>
                    <div>
                        <textarea name="body" placeholder="body"></textarea>
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
                {postData && (
                    <pre dir="ltr">{JSON.stringify(postData, null, 4)}</pre>
                )}
            </div>
        </>
    );
};
