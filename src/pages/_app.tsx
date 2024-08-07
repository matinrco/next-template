import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Provider as ReactReduxProvider } from "react-redux";
import { wrapper } from "@/rtk/store";
import "@/global.css";

const App = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <ReactReduxProvider store={store}>
            <Component {...props.pageProps} />
        </ReactReduxProvider>
    );
};

export default appWithTranslation(App);
