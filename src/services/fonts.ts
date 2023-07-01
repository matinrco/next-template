import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
    subsets: ["latin", "latin-ext"],
    adjustFontFallback: false,
    fallback: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
    ],
});

export const vazirmatn = localFont({
    src: [
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Thin.woff2",
            style: "normal",
            weight: "100",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-ExtraLight.woff2",
            style: "normal",
            weight: "200",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Light.woff2",
            style: "normal",
            weight: "300",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Regular.woff2",
            style: "normal",
            weight: "400",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Medium.woff2",
            style: "normal",
            weight: "500",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-SemiBold.woff2",
            style: "normal",
            weight: "600",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Bold.woff2",
            style: "normal",
            weight: "700",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-ExtraBold.woff2",
            style: "normal",
            weight: "800",
        },
        {
            path: "../../node_modules/vazirmatn/fonts/webfonts/Vazirmatn-Black.woff2",
            style: "normal",
            weight: "900",
        },
    ],
    adjustFontFallback: false,
    fallback: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
    ],
});
