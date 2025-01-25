import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import {
    startNavigationProgress,
    NavigationProgress,
    resetNavigationProgress,
} from "@mantine/nprogress";

export const RouterTransition = (): ReactElement => {
    const router = useRouter();

    useEffect(() => {
        const handleStart = (url: string) =>
            url !== router.asPath && startNavigationProgress();
        const handleComplete = () => resetNavigationProgress();

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return <NavigationProgress />;
};