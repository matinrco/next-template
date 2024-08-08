const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
    openAnalyzer: true,
    logLevel: "silent",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        ...i18n,
        localeDetection: false,
    },
};

module.exports = withBundleAnalyzer(nextConfig);
