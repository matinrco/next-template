import { ReactElement, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import type { ColorScheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useColorScheme } from "@mantine/hooks";
import { appWithTranslation } from "next-i18next";
import { Provider as ReactReduxProvider } from "react-redux";
import { wrapper } from "src/services/store";
import { getDirection } from "src/services/localeUtils";
import { ltrEmotionCache, rtlEmotionCache } from "src/services/emotionCache";
import { getTheme } from "src/services/theme";
import RouterTransition from "src/screens/shared/RouterTransition";
import "src/services/global.scss";

const COLOR_SCHEME = "color-scheme";
const IS_COLOR_SCHEME_SET_EXPLICITLY = "is-color-scheme-set-explicitly";

const CustomApp = ({
    Component,
    colorScheme: initialColorScheme,
    ...rest
}: AppProps & {
    colorScheme?: ColorScheme;
}): ReactElement => {
    const preferredColorScheme = useColorScheme(initialColorScheme);
    const [colorScheme, setColorScheme] = useState(
        initialColorScheme === "dark" || initialColorScheme === "light"
            ? initialColorScheme
            : preferredColorScheme,
    );
    const router = useRouter();
    const dir = getDirection(router?.locale || "");
    const { store, props } = wrapper.useWrappedStore(rest);

    useEffect(() => {
        document.querySelector("html")?.setAttribute("dir", dir);
    }, [dir]);

    useEffect(() => {
        setCookie(COLOR_SCHEME, colorScheme);
    }, [colorScheme]);

    useEffect(() => {
        if (
            preferredColorScheme !== colorScheme &&
            !!!getCookie(IS_COLOR_SCHEME_SET_EXPLICITLY)
        ) {
            setColorScheme(preferredColorScheme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preferredColorScheme]);

    return (
        <ReactReduxProvider store={store}>
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={(selectedColorScheme) => {
                    if (selectedColorScheme) {
                        setColorScheme(selectedColorScheme);
                    } else {
                        setColorScheme(
                            colorScheme === "light" ? "dark" : "light",
                        );
                    }
                    setCookie(IS_COLOR_SCHEME_SET_EXPLICITLY, true);
                }}
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
                    <RouterTransition />
                    <Notifications position="top-center" />
                    <Component {...props.pageProps} />
                </MantineProvider>
            </ColorSchemeProvider>
        </ReactReduxProvider>
    );
};

CustomApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie(COLOR_SCHEME, ctx),
});

export default appWithTranslation(CustomApp);
