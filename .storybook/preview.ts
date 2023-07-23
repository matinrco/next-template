import type { Preview } from "@storybook/react";
import { i18n as i18nConfig } from "../next-i18next.config";
import i18nDecorator from "./decorators/i18n";
import mantineDecorator from "./decorators/mantine";

export const decorators = [i18nDecorator, mantineDecorator];

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
            defaultValue: i18nConfig.defaultLocale,
            toolbar: {
                icon: "globe",
                items: i18nConfig.locales.map((locale) => ({
                    value: locale,
                    title: locale.toUpperCase(),
                })),
                showName: true,
                dynamicTitle: true,
            },
        },
    },
};

export default preview;
