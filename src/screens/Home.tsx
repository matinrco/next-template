import React, { ReactElement } from "react";
import Link from "next/link";
import { useTranslation, Trans } from "next-i18next";
import { Input, Grid, Container, ActionIcon, Tooltip } from "@mantine/core";
import { BsQuestionCircle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "src/services/store";
import { actions } from "src/services/slices/shared";
import { api } from "src/services/api";

const Home = (): ReactElement => {
    const { t } = useTranslation(["common", "home"]);
    const dispatch = useAppDispatch();
    const { increment, updateCity, createFooWithThunk } = actions;
    const { counter, city } = useAppSelector((state) => state.shared);

    const {
        data: weather,
        isFetching: isWeatherFetching,
        isUninitialized: isWeatherUninitialized,
    } = api.useGetWeatherQuery({ city }, { skip: city.length === 0 });

    const { data: tehranWeather, isSuccess: isTehranWeatherSuccess } =
        api.useGetWeatherANSIQuery({ city: "Tehran" });

    const [createFoo, { isLoading: isFooLoading }] = api.useCreateFooMutation({
        fixedCacheKey: "create-foo",
    });

    return (
        <div>
            this is home
            <hr />
            <Container style={{ marginTop: 50, marginBottom: 50 }}>
                <Grid>
                    <Grid.Col span={4} />
                    <Grid.Col span={4}>
                        <Input
                            size="lg"
                            styles={(theme) => ({
                                input: {
                                    backgroundColor: "#f6f6f8",
                                    borderColor: "transparent",
                                    fontSize: theme.fontSizes.sm,
                                    borderRadius: 35,
                                },
                            })}
                            placeholder="رمز یکبار مصرف"
                            rightSection={
                                <Tooltip
                                    label="کلمه عبور به شما پیامک خواهد شد"
                                    position="top"
                                    withArrow
                                >
                                    <ActionIcon>
                                        <BsQuestionCircle />
                                    </ActionIcon>
                                </Tooltip>
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={4} />
                </Grid>
            </Container>
            <hr />
            {isTehranWeatherSuccess && (
                <>
                    <iframe
                        style={{
                            width: "100%",
                            height: 700,
                            backgroundColor: "teal",
                        }}
                        srcDoc={tehranWeather}
                    ></iframe>
                    <hr />
                </>
            )}
            {(() => {
                if (!isWeatherUninitialized) {
                    return isWeatherFetching ? (
                        "loading..."
                    ) : (
                        <Trans
                            t={t}
                            ns="home"
                            i18nKey="currentWeatherInCity"
                            values={{
                                city,
                                weather:
                                    weather?.current_condition?.[0]?.temp_C ||
                                    "---",
                            }}
                        />
                    );
                } else {
                    return "please select a city";
                }
            })()}
            <br />
            <br />
            <select
                onChange={({ target }) =>
                    target.value.length !== 0 &&
                    dispatch(updateCity(target.value))
                }
                value={city}
            >
                <option value="">select a city</option>
                <option value="tehran">{t("tehran")}</option>
                <option value="isfahan">
                    {t("isfahan", { ns: "common" })}
                </option>
                <option value="gilan">{t("gilan")}</option>
            </select>
            <hr />
            current counter value: {counter}
            <br />
            <br />
            <button onClick={() => dispatch(increment())}>
                increment (by thunk)
            </button>
            <hr />
            <button onClick={() => createFoo({ foo: "bar" })}>mutation</button>
            <button onClick={() => dispatch(createFooWithThunk())}>
                mutation from thunk
            </button>
            <hr />
            <Link href="/" locale="en">
                <a>To EN</a>
            </Link>
            <br />
            <Link href="/" locale="fa">
                <a>To FA</a>
            </Link>
            <hr />
        </div>
    );
};

export default Home;
