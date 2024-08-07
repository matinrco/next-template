import type { i18n } from "i18next";

interface Locales {
    en: {
        common: typeof import("@/locales/en/common.json");
        root: typeof import("@/locales/en/root.json");
        error404: typeof import("@/locales/en/error404.json");
    };
    fa: {
        common: typeof import("@/locales/fa/common.json");
        root: typeof import("@/locales/fa/root.json");
        error404: typeof import("@/locales/fa/error404.json");
    };
}

declare module "i18next" {
    interface CustomTypeOptions extends i18n {
        resources: Locales["en"];
    }
}
