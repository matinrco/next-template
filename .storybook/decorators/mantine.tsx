import React from "react";
import type { StoryFn, StoryContext } from "@storybook/react";
import { useDarkMode } from "storybook-dark-mode";
import { MantineProvider } from "@mantine/core";
import { getTheme } from "../../src/services/theme";
import { getDirection } from "../../src/services/localeUtils";
import {
    ltrEmotionCache,
    rtlEmotionCache,
} from "../../src/services/emotionCache";

export default (Story: StoryFn, context: StoryContext) => {
    const dir = getDirection(context.globals.locale);
    const colorScheme = useDarkMode() ? "dark" : "light";

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={getTheme({
                dir,
                colorScheme,
            })}
            emotionCache={(() => {
                switch (dir) {
                    case "rtl":
                        return rtlEmotionCache;
                    case "ltr":
                        return ltrEmotionCache;
                }
            })()}
        >
            <Story />
        </MantineProvider>
    );
};
