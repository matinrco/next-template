/** @type {import('next-i18next').UserConfig} */
const i18nextConfig = {
    i18n: {
        defaultLocale: "fa",
        locales: ["en", "fa"],
    },
    localePath: "./src/locales",
};

module.exports = i18nextConfig;
