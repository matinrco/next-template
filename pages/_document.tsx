import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import rtlPlugin from "stylis-plugin-rtl";
import { getDirection } from "src/services/localeUtils";

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const direction = getDirection(ctx.locale);
        const stylesServer = createStylesServer(
            (() => {
                switch (direction) {
                    case "rtl":
                        return {
                            key: "mantine-rtl",
                            stylisPlugins: [rtlPlugin],
                        };
                    case "ltr":
                        return { key: "mantine" };
                }
            })(),
        );

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <ServerStyles
                        html={initialProps.html}
                        server={stylesServer}
                    />
                </>
            ),
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
