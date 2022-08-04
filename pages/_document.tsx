import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import { getDirection } from "src/services/localeUtils";
import { ltrEmotionCache, rtlEmotionCache } from "src/services/emotionCache";

const ltrStylesServer = createStylesServer(ltrEmotionCache);
const rtlStylesServer = createStylesServer(rtlEmotionCache);

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const direction = getDirection(ctx.locale);

        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles
                    html={initialProps.html}
                    server={(() => {
                        switch (direction) {
                            case "rtl":
                                return rtlStylesServer;
                            case "ltr":
                                return ltrStylesServer;
                        }
                    })()}
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
