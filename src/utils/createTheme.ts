import { createTheme as mantineCreateTheme } from "@mantine/core";
import { vazirmatn } from "@/utils/fonts/vazirmatn";
import { opensans } from "@/utils/fonts/opensans";

type ThemeParams = {
    dir?: "ltr" | "rtl";
} | void;

export const createTheme = (themeParams: ThemeParams) => {
    return mantineCreateTheme({
        /** Put your mantine theme override here */
        fontFamily: (() => {
            switch (themeParams?.dir) {
                case "rtl":
                    return vazirmatn.style.fontFamily;
                case "ltr":
                    return opensans.style.fontFamily;
            }
        })(),
    });
};
