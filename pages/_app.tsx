import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { wrapper } from "src/services/store";
import "src/services/global.scss";

function CustomApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default wrapper.withRedux(appWithTranslation(CustomApp));
