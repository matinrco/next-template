import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import i18next from "i18next";
import { appWithTranslation } from "next-i18next";
import { Provider as ReactReduxProvider } from "react-redux";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createTheme } from "@/utils/createTheme";
import { wrapper } from "@/rtk/store";
import { RouterTransition } from "@/components/RouterTransition";
import "@/global.css";

const App = ({ Component, ...rest }: AppProps) => {
    const router = useRouter();
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <ReactReduxProvider store={store}>
            <DirectionProvider>
                <MantineProvider
                    theme={createTheme({ dir: i18next.dir(router?.locale) })}
                    defaultColorScheme="auto"
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
