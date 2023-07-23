import React, { useEffect, useState } from "react";
import { appWithTranslation } from "next-i18next";
import type { StoryFn, StoryContext } from "@storybook/react";
import { i18n } from "../../next-i18next.config";
import { getDirection } from "../../src/services/localeUtils";

const resources: {
    [key: string]: { [key: string]: { [key: string]: string } };
} = ((ctx) => {
    const keys = ctx.keys();
    const values = keys.map(ctx);
    const allFiles = keys.reduce((o, k, i) => {
        o[k] = values[i];
        return o;
    }, {});

    return i18n.locales.reduce((localeAccumulator, locale) => {
        localeAccumulator[locale] = {
            ...(() => {
                const entriesInCurrentLocale = Object.entries(allFiles).filter(
                    (entry) => entry[0].includes(`/${locale}/`),
                );

                const currentLocaleNamespaces = entriesInCurrentLocale.reduce(
                    (currentLocaleAccumulator, entryInCurrentLocale) => {
                        const currentNamespace = entryInCurrentLocale[0]
                            .replace(/^.*[\\\/]/, "") // get file name from path string
                            .replace(/\.[^/.]+$/, ""); // get namespace from file name
                        currentLocaleAccumulator[currentNamespace] =
                            entryInCurrentLocale[1];
                        return currentLocaleAccumulator;
                    },
                    {},
                );

                return currentLocaleNamespaces;
            })(),
        };

        return localeAccumulator;
    }, {});
})(require.context("../../src/locales", true, /.*\.(json?)/));

export default (Story: StoryFn, context: StoryContext) => {
    const [locale, setLocale] = useState(i18n.defaultLocale);

    const _nextI18Next = {
        ns:
            // extract all namespaces from resources
            Object.entries(resources)
                .map((entry) => entry[1])
                .reduce<string[]>((acc, ns) => {
                    const nsList = Object.keys(ns);

                    nsList.forEach((nsItem) => {
                        if (!acc.includes(nsItem)) {
                            acc.push(nsItem);
                        }
                    });

                    return acc;
                }, []),
        initialLocale: locale,
        initialI18nStore: {
            [locale]: {
                ...resources[locale],
            },
        },
        userConfig: {
            resources,
            i18n: {
                locales: i18n.locales,
                defaultLocale: locale,
            },
        },
    };

    useEffect(() => {
        setLocale(context.globals.locale);
        const direction = getDirection(context.globals.locale);
        document.querySelector("html")?.setAttribute("dir", direction);
        document
            .querySelector("html")
            ?.setAttribute("lang", context.globals.locale);
    }, [context.globals.locale]);

    const AppWithTranslation = appWithTranslation(Story);

    return (
        <AppWithTranslation
            pageProps={{
                _nextI18Next,
            }}
            // wtf are these 😐
            router={undefined as any}
            Component={undefined as any}
        />
    );
};
