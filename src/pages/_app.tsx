import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Provider as ReactReduxProvider } from "react-redux";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import i18next from "i18next";
import { wrapper } from "@/rtk/store";
import { createTheme } from "@/utils/createTheme";
import { RouterTransition } from "@/components/common/RouterTransition";
import "@/global.css";

const App = ({ Component, ...rest }: AppProps) => {
    const router = useRouter();
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <ReactReduxProvider store={store}>
            <DirectionProvider>
                <MantineProvider
                    theme={createTheme({ dir: i18next.dir(router.locale) })}
                    defaultColorScheme="light"
                >
                    <RouterTransition />
                    <Notifications />
                    <Component {...props.pageProps} />
                </MantineProvider>
            </DirectionProvider>
        </ReactReduxProvider>
    );
};

export default appWithTranslation(App);
