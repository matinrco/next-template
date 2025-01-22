import { createTheme as mantineCreateTheme } from "@mantine/core";
import { vazirmatn } from "@/utils/fonts/vazirmatn";
import { opensans } from "@/utils/fonts/opensans";

type ThemeParams = {
    dir?: "ltr" | "rtl";
} | void;

export const createTheme = (themeParams: ThemeParams) => {
    return mantineCreateTheme({
        /**
         * put your mantine theme override here
         * to apply TS types check mantine.d.ts in project root.
         */
        fontFamily: (() => {
            switch (themeParams?.dir) {
                case "rtl":
                    return vazirmatn.style.fontFamily;
                case "ltr":
                    return opensans.style.fontFamily;
            }
        })(),
        colors: {
            /**
             * you can also use generateColors() from @mantine/colors-generator
             */
            // brand: [
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            //     "#000000",
            // ],
        },
    });
};
