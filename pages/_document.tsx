import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";
import { createEmotionCache } from "@mantine/core";
import { ServerStyles, createStylesServer } from "@mantine/next";
import rtlPlugin from "stylis-plugin-rtl";
import { getDirection } from "src/services/localeUtils";

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const direction = getDirection(ctx.locale);
        const rtlCache = createEmotionCache({
            key: "mantine-rtl",
            stylisPlugins: [rtlPlugin],
        });
        const ltrCache = createEmotionCache({
            key: "mantine-ltr",
        });
        const stylesServer = createStylesServer(
            (() => {
                switch (direction) {
                    case "rtl":
                        return rtlCache;
                    case "ltr":
                        return ltrCache;
                }
            })(),
        );

        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles
                    html={initialProps.html}
                    server={stylesServer}
                    key="styles"
                />,
            ],
        };
    }

    render() {
        const direction = getDirection(this.props.locale);

        return (
            <Html dir={direction}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
