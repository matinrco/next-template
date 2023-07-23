import type { MantineThemeOverride, ColorScheme } from "@mantine/core";
import { vazirmatn, openSans } from "./fonts";

type ThemeParams = {
    dir?: "ltr" | "rtl";
    colorScheme?: ColorScheme;
} | void;

export const getTheme = (themeParams: ThemeParams): MantineThemeOverride => ({
    dir: themeParams?.dir,
    colorScheme: themeParams?.colorScheme,
    fontFamily: (() => {
        switch (themeParams?.dir) {
            case "rtl":
                return vazirmatn.style.fontFamily;
            case "ltr":
                return openSans.style.fontFamily;
        }
    })(),
    globalStyles: (theme) => ({
        html: {
            scrollBehavior: "smooth",
        },
    }),
    /**
     * sample custom colors.
     * override or extend default theme colors.
     * to apply TS types check additional.d.ts in project root.
     */
    // colors: {
    //     brand: [
    //         "#7AD1DD",
    //         "#5FCCDB",
    //         "#44CADC",
    //         "#2AC9DE",
    //         "#1AC2D9",
    //         "#11B7CD",
    //         "#09ADC3",
    //         "#0E99AC",
    //         "#128797",
    //         "#147885",
    //     ],
    // },
    /**
     * sample custom theme attributes.
     * define custom theme parameters here.
     * to apply TS types check additional.d.ts in project root.
     */
    // other: {
    //     customProperty: "sample string",
    // },
});
