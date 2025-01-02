import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";
import i18next from "i18next";
import { ColorSchemeScript } from "@mantine/core";

class CustomDocument extends Document {
    static getInitialProps = async (
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> => {
        const originalRenderPage = ctx.renderPage;

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            });

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    };

    render = () => {
        return (
            <Html dir={i18next.dir(this.props.locale)}>
                <Head>
                    <ColorSchemeScript defaultColorScheme="light" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    };
}

export default CustomDocument;
