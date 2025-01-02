import Head from "next/head";
import { useTranslation } from "next-i18next";
import {
    Box,
    Stack,
    Title,
    Text,
    Divider,
    Space,
    Select,
    Alert,
    Skeleton,
    Group,
    ActionIcon,
    TextInput,
    Textarea,
    NumberInput,
    Button,
    Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CodeHighlight } from "@mantine/code-highlight";
import { IconTemperature, IconPlus, IconMinus } from "@tabler/icons-react";
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
    const { increment, updateCity, updateCounter } = {
        ...sharedSlice.actions,
        ...sharedThunkActions,
    };
    const { counter, city } = useAppSelector((state) => state.shared);
    const dispatch = useAppDispatch();
    const fixNumbers = useFixNumbers();

    const { data: weather, isFetching: isWeatherFetching } =
        weatherApis.useGetWeatherQuery({ city }, { skip: city.length === 0 });

    const [createPost, { data: postData }] = postApis.useCreatePostMutation();

    const form = useForm({
        initialValues: {
            title: "",
            userId: 0,
            body: "",
        },
    });

    return (
        <>
            <Head>
                <title>{t("title")}</title>
            </Head>
            <Box mih="100vh">
                <Space h="xl" />
                <Stack my="xl">
                    <Title ta="center" order={1}>
                        {t("title")}
                    </Title>
                    <Title ta="center" order={4}>
                        {t("description")} &#58;&#41;
                    </Title>
                    <Text ta="center">{t("author")}</Text>
                </Stack>
                <Box maw={800} mx="auto">
                    <Divider my="xl" maw={800} variant="dashed" />
                    <Stack maw={500} mx="auto">
                        <Select
                            label="View current temperature in your city"
                            data={[
                                { label: t("common:tehran"), value: "tehran" },
                                {
                                    label: t("common:isfahan"),
                                    value: "isfahan",
                                },
                                { label: t("common:gilan"), value: "gilan" },
                            ]}
                            disabled={isWeatherFetching}
                            onChange={(value) =>
                                value && dispatch(updateCity(value))
                            }
                            value={city}
                        />
                        {weather && (
                            <Alert
                                variant="light"
                                color="teal"
                                icon={<IconTemperature />}
                                styles={{
                                    body: {
                                        justifyContent: "center",
                                    },
                                }}
                            >
                                {isWeatherFetching && (
                                    <Skeleton height={12} radius="xl" />
                                )}
                                {!isWeatherFetching &&
                                    t("currentWeatherInCity", {
                                        replace: {
                                            city,
                                            weather: fixNumbers(
                                                weather?.current_condition?.[0]
                                                    ?.temp_C || "---",
                                            ),
                                        },
                                    }) + "."}
                            </Alert>
                        )}
                    </Stack>
                    <Divider my="xl" maw={800} variant="dashed" />
                    <Group justify="center">
                        <ActionIcon
                            variant="light"
                            size="lg"
                            color="red"
                            onClick={() => {
                                if (counter > 0) {
                                    dispatch(updateCounter(counter - 1));
                                }
                            }}
                        >
                            <IconMinus />
                        </ActionIcon>
                        <Text>{counter}</Text>
                        <ActionIcon
                            variant="light"
                            size="lg"
                            color="teal"
                            onClick={() => dispatch(increment())}
                        >
                            <IconPlus />
                        </ActionIcon>
                    </Group>
                    <Divider my="xl" maw={800} variant="dashed" />
                    <form
                        onSubmit={form.onSubmit((values) => {
                            createPost(values);
                        })}
                    >
                        <Stack maw={500} mx="auto" gap="xs">
                            <TextInput
                                {...form.getInputProps("title")}
                                label="Title"
                            />
                            <NumberInput
                                {...form.getInputProps("userId")}
                                label="User ID"
                            />
                            <Textarea
                                {...form.getInputProps("body")}
                                label="Body"
                                // resize="vertical"
                                // mih={200}
                            />
                            <Center>
                                <Button
                                    type="submit"
                                    variant="light"
                                    color="teal"
                                    mt="xs"
                                >
                                    Submit
                                </Button>
                            </Center>
                            {postData && (
                                <CodeHighlight
                                    code={JSON.stringify(postData, null, 4)}
                                    language="json"
                                />
                            )}
                        </Stack>
                    </form>
                    <Divider my="xl" maw={800} variant="dashed" />
                </Box>
            </Box>
        </>
    );
};
