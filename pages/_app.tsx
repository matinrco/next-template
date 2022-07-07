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
