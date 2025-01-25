import {
    defaultVariantColorsResolver,
    createTheme as mantineCreateTheme,
    parseThemeColor,
} from "@mantine/core";
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
        /**
         * if you add a custom color to the theme,
         * you may need to customize its behavior in different circumstances.
         * use `variantColorResolver` to handle this.
         */
        variantColorResolver: (input) => {
            const defaultResolvedColors = defaultVariantColorsResolver(input);
            const parsedColor = parseThemeColor({
                color: input.color || input.theme.primaryColor,
                theme: input.theme,
            });

            /**
             * just for demo only!!!
             * delete or modify the below block according to your needs
             */
            if (parsedColor.color === "brand" && input.variant === "filled") {
                if (
                    typeof parsedColor.shade === "undefined" ||
                    parsedColor.shade <= 6
                ) {
                    return {
                        ...defaultResolvedColors,
                        color: input.theme.colors.dark[7],
                    };
                }
            }

            return defaultResolvedColors;
        },
    });
};
