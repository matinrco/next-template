const isAnalyzeEnabled = process.env.ANALYZE === "true";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: isAnalyzeEnabled,
    openAnalyzer: true,
    logLevel: "silent",
});
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        ...i18n,
        localeDetection: false,
    },
};

module.exports = isAnalyzeEnabled ? withBundleAnalyzer(nextConfig) : nextConfig;
