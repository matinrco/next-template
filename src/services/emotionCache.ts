import { createEmotionCache } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

export const rtlEmotionCache = createEmotionCache({
    key: "mantine-rtl",
    stylisPlugins: [rtlPlugin],
});

export const ltrEmotionCache = createEmotionCache({
    key: "mantine-ltr",
});
