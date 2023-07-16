import type { Preview } from "@storybook/react";
import { i18n } from "../next-i18next.config";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    globalTypes: {
        locale: {
            name: "Locale",
            description: "Internationalization locale",
            defaultValue: i18n.defaultLocale,
            toolbar: {
                icon: "globe",
                items: i18n.locales.map((locale) => ({
                    value: locale,
                    title: locale,
                })),
                showName: true,
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
