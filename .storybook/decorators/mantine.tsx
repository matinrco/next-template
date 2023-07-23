import React from "react";
import type { StoryFn, StoryContext } from "@storybook/react";
import { useChannel } from "@storybook/addons";
import { useDarkMode, UPDATE_DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { getTheme } from "../../src/services/theme";
import { getDirection } from "../../src/services/localeUtils";
import {
    ltrEmotionCache,
    rtlEmotionCache,
} from "../../src/services/emotionCache";

export default (Story: StoryFn, context: StoryContext) => {
    const emit = useChannel({});

    const dir = getDirection(context.globals.locale);
    const colorScheme = useDarkMode() ? "dark" : "light";

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={() => emit(UPDATE_DARK_MODE_EVENT_NAME)}
        >
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
        </ColorSchemeProvider>
    );
};
