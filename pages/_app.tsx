import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { MantineProvider, ColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import rtlPlugin from "stylis-plugin-rtl";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "src/services/store";
import { getDirection } from "src/services/localeUtils";
import "src/services/global.scss";

function CustomApp({
    Component,
    pageProps,
    colorScheme,
}: AppProps & { colorScheme: ColorScheme | undefined }) {
    const preferredColorScheme = useColorScheme(colorScheme);
    const router = useRouter();
    const direction = getDirection(router?.locale || "");

    useEffect(() => {
        document.querySelector("html")?.setAttribute("dir", direction);
        setCookie("color-scheme", preferredColorScheme);
    });

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                dir: direction,
                // keep it inactive currently
                // colorScheme: preferredColorScheme,
                fontFamily: (() => {
                    switch (direction) {
                        case "rtl":
                            return `
                            Vazirmatn,
                            -apple-system, 
                            BlinkMacSystemFont, 
                            Segoe UI, 
                            Roboto,Helvetica, 
                            Arial, 
                            Noto Sans, 
                            sans-serif, 
                            Apple Color Emoji,
                            Segoe UI Emoji, 
                            Segoe UI Symbol, 
                            Noto Color Emoji
                        `;
                        case "ltr":
                            return `
                            -apple-system, 
                            BlinkMacSystemFont, 
                            Segoe UI, 
                            Roboto,Helvetica, 
                            Arial, 
                            Noto Sans, 
                            sans-serif, 
                            Apple Color Emoji,
                            Segoe UI Emoji, 
                            Segoe UI Symbol, 
                            Noto Color Emoji
                        `;
                    }
                })(),
                /**
                 * sample custom colors.
                 * override or extend default theme colors.
                 * to apply TS types check additional.d.ts in project root.
                 */
                // colors: {
                //     primary: [
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
                //     secondary: [
                //         "#F0BBDD",
                //         "#ED9BCF",
                //         "#EC7CC3",
                //         "#ED5DB8",
                //         "#F13EAF",
                //         "#F71FA7",
                //         "#FF00A1",
                //         "#E00890",
                //         "#C50E82",
                //         "#AD1374",
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
            }}
            emotionOptions={(() => {
                switch (direction) {
                    case "rtl":
                        return {
                            key: "mantine-rtl",
                            stylisPlugins: [rtlPlugin],
                        };
                    case "ltr":
                        return { key: "mantine" };
                }
            })()}
        >
            <Component {...pageProps} />
        </MantineProvider>
    );
}

CustomApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie("color-scheme", ctx),
});

export default wrapper.withRedux(appWithTranslation(CustomApp));
